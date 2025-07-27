const feedEl = document.getElementById('feed')

const res = await fetch('/tweets')
const data = await res.json() 

renderFeed(data)

document.addEventListener('click', e => {
    if (e.target.dataset.reply) {
        document.getElementById(`replies-${e.target.dataset.reply}`)
        .classList.toggle('hidden')
    } else if (e.target.dataset.like) {
        likeTweet(e.target.dataset.like)
    } else if (e.target.dataset.retweet) {
        retweetTweet(e.target.dataset.retweet)
    }
})

function renderFeed(data) {
    feedEl.innerHTML = data.map(tweet => `
        <div class="tweet">
            <div class="tweet-inner">
                <img src="${tweet.profilePic}" alt="profile pic" class="profile-pic">
                <div>
                    <p class="username">${tweet.username}</p>
                    <p class="tweet-text">${tweet.tweetText}</p>
                    <div class="tweet-details">
                        <span class="tweet-detail">
                            <i class="fa-regular fa-comment-dots"
                            data-reply="${tweet.uuid}"
                            ></i>
                            ${tweet.replies.length}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-heart ${tweet.isLiked && 'liked'}"
                            data-like="${tweet.uuid}"
                            ></i>
                            ${tweet.likes}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-retweet ${tweet.isRetweeted && 'retweeted'}"
                            data-retweet="${tweet.uuid}"
                            ></i>
                            ${tweet.retweets}
                        </span>
                    </div>   
                </div>            
            </div>
            <div class="hidden" id="replies-${tweet.uuid}">
                ${tweet.replies.map(reply => `
                    <div class="tweet-reply">
                        <div class="tweet-inner">
                            <img src="${reply.profilePic}" alt="profile pic" class="profile-pic">
                            <div>
                                <p class="username">${reply.username}</p>
                                <p class="tweet-text">${reply.tweetText}</p>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>   
        </div>
    `).join('')
}

function likeTweet(id) {
    data.forEach(el => {
        if (el.uuid === id) {
            el.isLiked ? el.likes-- : el.likes++
            el.isLiked = !el.isLiked
        }
    })
    renderFeed(data)
}

function retweetTweet(id) {
    data.forEach(el => {
        if (el.uuid === id) {
            el.isRetweeted ? el.retweets-- : el.retweets++
            el.isRetweeted = !el.isRetweeted
        }
    })
    renderFeed(data)
}