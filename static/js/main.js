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


// Hàm fetch để lấy thông tin bài viết theo ID
function getArticle(contentId) {
    const apiUrl = `http://103.98.150.254:8818/api/get_article?content_id=${contentId}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Article:', data);
        // Xử lý dữ liệu bài viết ở đây
      })
      .catch(error => {
        console.error('Error fetching article:', error);
      });
  }
  
  // Hàm fetch để thêm tương tác người dùng vào cơ sở dữ liệu
  function addUserInteraction(interactionData) {
    const apiUrl = `http://103.98.150.254:8818/api/interaction?${new URLSearchParams(interactionData)}`;
  
    fetch(apiUrl, { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        console.log('Interaction added:', data);
        // Xử lý dữ liệu nếu cần
      })
      .catch(error => {
        console.error('Error adding user interaction:', error);
      });
  }
  
  // Hàm fetch để lấy danh sách bài viết trang chủ
  function getHomepageArticles(userId) {
    const apiUrl = `http://103.98.150.254:8818/api/recommend_homepage_articles?user_id=${userId}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Homepage articles:', data);
        // Xử lý dữ liệu danh sách bài viết trang chủ ở đây
      })
      .catch(error => {
        console.error('Error fetching homepage articles:', error);
      });
  }
  
  // Hàm fetch để lấy danh sách bài viết được đề xuất theo nút "Thích"
  function getLikedArticles(contentId) {
    const apiUrl = `http://103.98.150.254:8818/api/recommend_liked_articles?content_id=${contentId}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Recommended liked articles:', data);
        // Xử lý dữ liệu danh sách bài viết được đề xuất ở đây
      })
      .catch(error => {
        console.error('Error fetching recommended liked articles:', error);
      });
  }
  
  // Hàm fetch để lấy danh sách bài viết được đề xuất theo nút "Theo dõi"
  function getFollowedArticles(authorPersonId) {
    const apiUrl = `http://103.98.150.254:8818/api/recommend_followed_articles?author_person_id=${authorPersonId}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Recommended followed articles:', data);
        // Xử lý dữ liệu danh sách bài viết được đề xuất ở đây
      })
      .catch(error => {
        console.error('Error fetching recommended followed articles:', error);
      });
  }
  
  // Hàm fetch để lấy danh sách bài viết được đề xuất (bài viết liên quan)
  function getRelatedArticles(userId) {
    const apiUrl = `http://103.98.150.254:8818/api/recommend_related_articles?user_id=${userId}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Recommended related articles:', data);
        // Xử lý dữ liệu danh sách bài viết được đề xuất ở đây
      })
      .catch(error => {
        console.error('Error fetching recommended related articles:', error);
      });
  }
  
// Sử dụng các hàm trên với các tham số thích hợp
// getArticle('2480569770059008227');
// addUserInteraction({
// user_id: '29888888888',
// event_type: 'VIEW',
// content_id: '4109618890343020064',
// session_id: '7899999999999',
// user_agent: 'Mozilla SPAM LINH TINH',
// user_region: 'US',
// user_country: 'USA'
// });
// getHomepageArticles('-9150583489352258206');
// getLikedArticles('2480569770059008227');
// getFollowedArticles('-2979881261169775358');
// getRelatedArticles('-9150583489352258206');

// Function to fetch article data by content_id
// function getArticleById(contentId) {
//     const apiUrl = `http://api.recsysproject.tech/api/get_article?content_id=${contentId}`;
  
//     fetch(apiUrl)
//       .then(response => response.json())
//       .then(data => {
//         console.log('Article data:', data);
//         // Handle the article data here
//       })
//       .catch(error => {
//         console.error('Error fetching article data:', error);
//       });
//   }
  
  // Usage with the provided content_id
//   const contentId = '2480569770059008227';
//   getArticleById(contentId);
  