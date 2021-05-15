// Init GutHub
const github = new GitHub();
// Init UI
const ui = new UI();

// search input
const searchUser = document.getElementById('search-user')
// search input event listener
searchUser.addEventListener('keyup', (e) => {
  //  get input text
  const userText = e.target.value;
  // validate input is not empty
  if (userText !== '') {
    // make HTTP call to get user
    github.getUser(userText)
      .then(response => {
        if (response.profile.message !== 'Not Found') {
          ui.showProfile(response.profile);
          ui.showRepos(response.repos)

        }
        else {
          console.error('Profile not Found')
          // alert - not found
          ui.showAlert("User Not Found");
        }
      })
  } else {
    // clear profile
    ui.clearProfile();
  }
})