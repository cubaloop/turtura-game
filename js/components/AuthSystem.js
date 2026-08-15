// Persistent User Authentication & Profile System for Turtura
class AuthSystem {
  constructor(onLoginSuccess) {
    this.onLoginSuccess = onLoginSuccess;
    this.currentUser = this.loadActiveUser();
  }

  loadActiveUser() {
    try {
      const activeUsername = localStorage.getItem('turtura_active_username');
      if (!activeUsername) return null;
      const data = localStorage.getItem(`turtura_user_${activeUsername}`);
      return data ? JSON.parse(data) : null;
    } catch(e) {
      return null;
    }
  }

  register(username, password) {
    if (!username || !password) return { success: false, msg: "Introduce usuario y contraseña." };
    const key = `turtura_user_${username.toLowerCase()}`;
    if (localStorage.getItem(key)) return { success: false, msg: "Este usuario ya existe." };

    const newUser = {
      username: username.toLowerCase(),
      displayName: username,
      password: password,
      level: 1,
      gems: 123,
      coins: 74851,
      towerFloor: 1,
      cards: GAME_RULES.getRandomInitialCards()
    };

    localStorage.setItem(key, JSON.stringify(newUser));
    localStorage.setItem('turtura_active_username', newUser.username);
    this.currentUser = newUser;
    return { success: true, user: newUser };
  }

  login(username, password) {
    const key = `turtura_user_${username.toLowerCase()}`;
    const data = localStorage.getItem(key);
    if (!data) return { success: false, msg: "Usuario no encontrado." };
    const user = JSON.parse(data);
    if (user.password !== password) return { success: false, msg: "Contraseña incorrecta." };

    localStorage.setItem('turtura_active_username', user.username);
    this.currentUser = user;
    return { success: true, user: user };
  }

  saveUserData(userData) {
    if (!this.currentUser) return;
    this.currentUser = { ...this.currentUser, ...userData };
    localStorage.setItem(`turtura_user_${this.currentUser.username}`, JSON.stringify(this.currentUser));
  }

  logout() {
    localStorage.removeItem('turtura_active_username');
    this.currentUser = null;
  }
}

window.AuthSystem = AuthSystem;
