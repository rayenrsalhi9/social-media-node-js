import { v4 as uuidv4 } from 'https://jspm.dev/uuid'; 
import sanitizeHtml from 'https://jspm.dev/sanitize-html'

const feedEl = document.getElementById('feed')
const tweetInput = document.getElementById('tweet-input')
const tweetBtn = document.getElementById('tweet-btn')

const res = await fetch('/tweets')
const data = await res.json() 

renderFeed(data)

document.addEventListener('click', async(e) => {
    if (e.target.dataset.reply) {
        document.getElementById(`replies-${e.target.dataset.reply}`)
        .classList.toggle('hidden')
    } else if (e.target.dataset.like) {
        await likeTweet(e.target.dataset.like)
    } else if (e.target.dataset.retweet) {
        await retweetTweet(e.target.dataset.retweet)
    }
})

tweetBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    const tweetContent = sanitizeInput(tweetInput.value)
    const tweetObj = {
        uuid: uuidv4(),
        username: '@essalhi18',
        profilePic: 'images/profile-pic.jpg',
        tweetText: tweetContent,
        replies: [],
        likes: 0,
        retweets: 0,
        isLiked: false,
        isRetweeted: false,
    }
    data.unshift(tweetObj)
    tweetInput.value = ''
    renderFeed(data)
    showNotification()
    await fetch('/tweets', {
        method: 'POST',
        headers:  { 'Content-Type': 'application/json' },
        body: JSON.stringify(tweetObj)
    })
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

async function likeTweet(id) {

    const matchingTweet = data.find(el => el.uuid === id)

    data.forEach(el => {
        if (el.uuid === id) {
            el.isLiked ? el.likes-- : el.likes++
            el.isLiked = !el.isLiked
        }
    })
    renderFeed(data)

    await fetch(`/tweets/${id}/like`, 
        { 
            method: 'PUT', 
            headers:  { 'Content-Type': 'application/json' }
        }
    )
    
}

async function retweetTweet(id) {

    const matchingTweet = data.find(el => el.uuid === id)

    data.forEach(el => {
        if (el.uuid === id) {
            el.isRetweeted ? el.retweets-- : el.retweets++
            el.isRetweeted = !el.isRetweeted
        }
    })
    renderFeed(data)

    await fetch(`/tweets/${id}/retweet`, 
        { 
            method: 'PUT', 
            headers:  { 'Content-Type': 'application/json' }
        }
    )

}

function showNotification() {
    const notification = document.getElementById('notification');
    
    notification.classList.remove('show', 'hide');
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        notification.classList.add('hide');
    }, 3000);
}

function sanitizeInput(input) {
    return sanitizeHtml(input)
}