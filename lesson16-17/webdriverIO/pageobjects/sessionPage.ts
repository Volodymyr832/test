class SessionPage {
    async isCookieAccepted(): Promise<boolean> {
      const accepted = await browser.execute(() => {
        return localStorage.getItem('cookie-accepted');
      });
      return accepted === 'true';
    }
  
    async getSessionCookie() {
      const cookies = await browser.getCookies();
      return cookies.find(cookie => cookie.name === 'PHPSESSID');
    }
  }
  
  export default new SessionPage();
  