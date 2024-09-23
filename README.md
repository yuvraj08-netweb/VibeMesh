# VibeMesh - A Web-Based Chatting App

**Tagline**: *Weaving seamless connections, one vibe at a time.*

## About VibeMesh

At VibeMesh, we believe in the power of connection. Our chat platform is designed to make conversations seamless, intuitive, and fun. Whether you're catching up with friends, collaborating with colleagues, or building new communities, VibeMesh offers a secure and vibrant space to share ideas and stay in touch. With easy-to-use features, personalized settings, and a focus on user privacy, we aim to create an engaging experience where every interaction counts. Join the vibe and mesh with the world!

## Features

- **Real-Time Messaging**: Send and receive messages instantly.
- **User Authentication**: Sign up using email/password or Google account.
- **Profile Management**: Store user information including full name, email, password, and profile image.
- **Firebase Integration**: Utilizes Firebase Authentication, Firestore, and Storage for secure data handling.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Firebase
  - Firebase Authentication
  - Firestore Database
  - Firebase Storage

## Getting Started

To get a local copy of the project up and running, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) (for package management)
- A Firebase account and project setup

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/vibemesh.git
   cd vibemesh

2. **Set up Firebase**:

- Create a new project in the Firebase Console.
- Enable Authentication (Email/Password and Google sign-in).
- Set up Firestore and Storage.

3. **Configure Firebase**:

- Replace the Firebase configuration in src/index.js with your project's configuration details.

4. **Install dependencies**:
    ```bash
    npm install

5. **Run the application**:
    ```bash
    npm run dev

6. **Open the project**:
- Navigate to http://localhost:3000 in your browser to view the application.

## Usage
1. **Sign Up**: Users can create an account using their email and password or sign up using Google.
2. **Profile Image Upload**: Users can upload a profile image during the sign-up process.
3. **Real-Time Messaging**: Users can send and receive messages in real-time.

## Contribution
Contributions are welcome! Please open an issue or submit a pull request if you have any suggestions or improvements.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements

- [Firebase Documentation](https://firebase.google.com/docs)
- [Google Sign-In Documentation](https://developers.google.com/identity/sign-in/web/sign-in)
