// const loggings = document.querySelector('.buy-tickets')
const buyBtns = document.querySelectorAll('.js-buy-ticket')
const closeBtn = document.querySelector('.modal-close')
const modalContainer = document.querySelector('.js-modal-container')
const closeBtn2 = document.querySelector('.modal-close2')
const modalContainer2 = document.querySelector('.js-modal-container2')
const modal = document.querySelector('.js-modal')
const modal2 = document.querySelector('#modal2')
const loginBtns = document.querySelectorAll('.btn-login')
const registerBtns = document.querySelectorAll('.btn-register')

for (const loginBtn of loginBtns) {
    loginBtn.addEventListener('click', () => {
        modal2.classList.remove("open")
        modal.classList.add("open")
        modal.classList.add("animated")
        modal.classList.add("FadeIn")
    })
}

for (const registerBtn of registerBtns) {
    registerBtn.addEventListener('click', () => {
        modal.classList.remove("open")
        modal2.classList.add("open")
        modal2.classList.add("animated")
        modal2.classList.add("FadeIn")
    })
}

for (const buyBtn of buyBtns) {
    buyBtn.addEventListener('click', showBuyTickets)
}


function hideBuyTickets() {
    modal.classList.remove("open")
}

function hideBuyTickets2() {
    modal2.classList.remove("open")
}

// loggings.addEventListener('click', hideBuyTickets)

closeBtn.addEventListener('click', hideBuyTickets)
closeBtn2.addEventListener('click', hideBuyTickets2)

modal.addEventListener('click', hideBuyTickets)

modal2.addEventListener('click', hideBuyTickets)

modalContainer.addEventListener('click', function(event) {
    event.stopPropagation()
})

modalContainer2.addEventListener('click', function(event) {
    event.stopPropagation()
})

function toggleButtonClick(button) {
  button.querySelector('i').classList.toggle('clicked');
}

// Hàm để tạo session ID từ ngày giờ hiện tại
function generateSessionId() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const milliseconds = now.getMilliseconds().toString().padStart(3, '0');

  // Chuỗi session ID có thể được tạo từ các thành phần thời gian
  const sessionId = `${year}${month}${day}${hours}`;
  return sessionId;
}

// 103.98.150.254:8818
const api_source = 'http://api.recsysproject.tech';

// Hàm fetch để lấy thông tin bài viết theo ID
function getArticle(contentId) {
  const apiUrl = `${api_source}/api/get_article?content_id=${contentId}`;
  
  // Trả về một Promise
  return new Promise((resolve, reject) => {
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Giải quyết Promise với dữ liệu
        resolve(data);
      })
      .catch(error => {
        console.error('Error fetching homepage articles:', error);
        // Từ chối Promise với lỗi
        reject(error);
      });
  });
}
  function addUserInteraction(user_id, event_type, content_id, session_id, user_agent, user_region, user_country) {
    const apiUrl = `${api_source}/api/interaction?user_id=${user_id}&event_type=${event_type}&content_id=${content_id}&session_id=${session_id}&user_agent=${encodeURIComponent(user_agent)}&user_region=${user_region}&user_country=${user_country}`;
  
    return fetch(apiUrl, { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .catch(error => {
        console.error('Error adding user interaction:', error);
      });
  }
  
  // Hàm fetch để lấy danh sách bài viết trang chủ
  function getHomepageArticles(userId) {
    const apiUrl = `${api_source}/api/recommend_homepage_articles?user_id=${userId}`;
  
    // Trả về một Promise
    return new Promise((resolve, reject) => {
      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          // Giải quyết Promise với dữ liệu
          resolve(data);
        })
        .catch(error => {
          // Từ chối Promise với lỗi
          reject(error);
        });
    });
  }

  // Hàm fetch để lấy danh sách bài viết được đề xuất theo nút "Thích"
function getLikedArticles(contentId) {
  const apiUrl = `${api_source}/api/recommend_liked_articles?content_id=${contentId}`;

  // Trả về một Promise
  return new Promise((resolve, reject) => {
      fetch(apiUrl)
          .then(response => {
              if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();
          })
          .then(data => {
              // Giải quyết Promise với dữ liệu
              resolve(data);
          })
          .catch(error => {
              // Từ chối Promise với lỗi
              reject(error);
          });
  });
}

// Hàm fetch để lấy danh sách bài viết được đề xuất theo nút "Theo dõi"
function getFollowedArticles(authorPersonId) {
  const apiUrl = `${api_source}/api/recommend_followed_articles?author_person_id=${authorPersonId}`;

  // Trả về một Promise
  return new Promise((resolve, reject) => {
      fetch(apiUrl)
          .then(response => {
              if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();
          })
          .then(data => {
              // Giải quyết Promise với dữ liệu
              resolve(data);
          })
          .catch(error => {
              console.error('Error fetching recommended followed articles:', error);
              // Từ chối Promise với lỗi
              reject(error);
          });
  });
}
  
  // Hàm fetch để lấy danh sách bài viết được đề xuất (bài viết liên quan)
  function getRelatedArticles(userId) {
    const apiUrl = `${api_source}/api/recommend_related_articles?user_id=${userId}`;

    // Trả về một Promise
    return new Promise((resolve, reject) => {
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Giải quyết Promise với dữ liệu
                resolve(data);
            })
            .catch(error => {
                console.error('Error fetching recommended related articles:', error);
                // Từ chối Promise với lỗi
                reject(error);
            });
    });
}
