# 🐾 Meow Facts

![Angular](https://img.shields.io/badge/Angular-19%2B-red?logo=angular)
![PrimeNG](https://img.shields.io/badge/PrimeNG-UI-blueviolet?logo=prime)
![Firebase Auth](https://img.shields.io/badge/Firebase-Auth-yellow?logo=firebase)
![License](https://img.shields.io/badge/license-MIT-green)

> **A modern, animated, and secure cat facts app built with Angular, PrimeNG, and Firebase Authentication.**

---

## 🐱 What is Meow Facts?

Meow Facts is a delightful web app that lets you discover fascinating facts about cats! Sign up, log in, and scroll through an endless, animated list of cat trivia. Built for speed, security, and a purr-fect user experience.

---

## ✨ Features

- 🔒 **Firebase Authentication** (Email/Password)
- 🎨 **PrimeNG UI**: Beautiful cards, buttons, toasts, and spinners
- 🐈 **Infinite Cat Facts**: Scroll to load more, with smooth animations
- 🚫 **Route Guards**: Secure pages for logged-in users only
- 🌈 **Responsive & Modern Design**
- 🖼️ **Optimized Images** and custom branding
- ⚡ **Error Handling**: Toast notifications for errors

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/meow-facts.git
cd meow-facts
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Firebase

- The project is already configured with a working Firebase setup for demo purposes.
- If you want to use your own Firebase project, simply update the config in `src/environments/environment.ts`:

```ts
export const environment = {
  firebase: {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    // ...other config
  },
  production: false,
};
```

### 4. Run the app

```bash
ng serve
```

Visit [http://localhost:4200](http://localhost:4200) 🚀

---

## 🛠️ Tech Stack

- [Angular 19+](https://angular.io/)
- [PrimeNG](https://primeng.org/)
- [PrimeFlex](https://www.primefaces.org/primeflex/)
- [Firebase Auth](https://firebase.google.com/products/auth)
- [RxJS](https://rxjs.dev/)

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

[MIT](LICENSE)

---

## 😸 Fun Fact

> Did you know? Cats have five toes on their front paws, but only four on the back!
