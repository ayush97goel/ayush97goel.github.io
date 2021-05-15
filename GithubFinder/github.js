class GitHub {
  constructor() {
    this.reposSort = 'updated: asc';
  }
  //  async method that returns object of promises
  async getUser(user) {
    const profileResponse = await fetch(`https://api.github.com/users/${user}`);
    const reposResponse = await fetch(`https://api.github.com/users/${user}/repos?sort=${this.reposSort}`);

    const profileData = await profileResponse.json();
    const reposData = await reposResponse.json();

    return {
      profile: profileData,
      repos: reposData
    }
  }
}