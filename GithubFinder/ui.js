class UI {
  constructor() {
    this.profile = document.getElementById('profile');
  }

  showProfile(user) {
    const memberSince = new Date(user.created_at).getUTCFullYear()
    this.profile.innerHTML = `
    <div class="card card-body mb-3" id="profile-card">
      <div class="row" >
        <div class="col-md-3">
          <img src="${user.avatar_url}" alt="avatar" class="img-fluid w-100 img-thumbnail mb-2">
          <a href="${user.html_url}" class="btn btn-primary w-100 mb-3" target="_blank">Show Profile</a>
        </div>
        <div class="col-md-9">
          <span class="badge bg-primary mb-2">Public Repos: ${user.public_repos}</span>
          <span class="badge bg-secondary mb-2">Public Gists: ${user.public_gists}</span>
          <span class="badge bg-success mb-2">Followers: ${user.followers}</span>
          <span class="badge bg-info mb-2">Following: ${user.following}</span>
          <br>
          <br>
          <ul class="list-group">
            <li class="list-group-item">Company : ${user.company}</li>
            <li class="list-group-item">Website/Blog : ${user.blog}</li>
            <li class="list-group-item">Location : ${user.location}</li>
            <li class="list-group-item">Bio : ${user.bio}</li>
            <li class="list-group-item">Email : ${user.email}</li>
            <li class="list-group-item">Member since : ${memberSince}</li>
          </ul>
        </div>
      </div>
    </div>
    <h3 class="page-heading mb-3">Latest Repos</h3>
    <div id="repos"></div>
    `;
  }

  showRepos(repos) {
    const reposDiv = document.getElementById('repos');
    let output = '';
    repos.forEach(repo => {
      output += `
      <div class="card card-body mb-2">
        <div class="row">
          <div class="col-md-6 mb-2">
            <a href="${repo.html_url}" target="_blank"> ${repo.name} </a>
          </div>
          <div class="col-md-6 text-end"> 
              <span class="badge bg-primary ">${repo.language}</span>
              <span class="badge bg-info ">Stars: ${repo.stargazers_count}</span>
              <span class="badge bg-warning ">Watchers: ${repo.watchers_count} </span>
              <span class="badge bg-success ">Forks: ${repo.forks_count}</span>

          </div>
        </div>
      </div>
      `
    });

    reposDiv.innerHTML = output;
  }
  showAlert(msg) {
    // Clear any previos alerts
    this.clearAlert();
    const parentContainer = document.querySelector('.search-container');
    const firstDiv = document.querySelector('.search');
    // create an alert div element and add class to it
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-danger'
    // create and append the text node to alertDiv
    alertDiv.appendChild(document.createTextNode(msg));
    // append parent div to parent container
    parentContainer.insertBefore(alertDiv, firstDiv);

    setTimeout(() => {
      this.clearAlert();
    }, 3000)

  }

  clearAlert() {
    const alert = document.querySelector('.alert');
    if (alert) {
      alert.remove();
    }
  }
  clearProfile() {
    this.profile.innerHTML = "";
  }
}