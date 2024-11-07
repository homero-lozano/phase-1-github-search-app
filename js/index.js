document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#github-form");
    const searchInput = document.querySelector("#search");
  
    if (form && searchInput) {
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const query = searchInput.value.trim();
        if (query === "") {
          alert("Please enter a search term.");
          return;
        }
  
        try {
          const data = await searchUsers(query);
          if (data && data.items) {
            displayUsers(data.items);
          } else {
            alert("No users found.");
          }
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      });
    } else {
      console.error("Form or search input not found. Please check the HTML structure.");
    }
  });
  
  async function searchUsers(query) {
    const response = await fetch(`https://api.github.com/search/users?q=${query}`, {
      headers: { Accept: "application/vnd.github.v3+json" }
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return response.json();
  }
  
  function displayUsers(users) {
    const userList = document.getElementById("user-list");
    userList.innerHTML = ""; 
  
    users.forEach(user => {
      const userItem = document.createElement("li");
      userItem.textContent = user.login;
      userList.appendChild(userItem);
    });
  }
  