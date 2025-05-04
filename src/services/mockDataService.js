// Mock data service to replace backend API calls

// Mock user data
export const mockUser = {
  name: "demo_user",
  email: "demo@example.com",
  role: "user"
};

// Mock messages for ClassBridge
export const mockMessages = [
  {
    _id: "1",
    message: "Welcome to DataBrainHub!",
    user: "Admin",
    time: new Date().toLocaleTimeString()
  },
  {
    _id: "2",
    message: "How can I help you today?",
    user: "Admin",
    time: new Date().toLocaleTimeString()
  },
  {
    _id: "3",
    message: "Check out our resources section for study materials.",
    user: "Admin",
    time: new Date().toLocaleTimeString()
  }
];

// Mock login function
export const mockLogin = (email, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: email.split('@')[0],
        email: email,
        role: "user"
      });
    }, 500);
  });
};

// Mock get messages function
export const mockGetMessages = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: mockMessages });
    }, 300);
  });
};

// Mock get current user function
export const mockGetMe = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUser);
    }, 300);
  });
};

// Mock logout function
export const mockLogout = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ msg: "Logged out successfully" });
    }, 300);
  });
};

// Mock send message function
export const mockSendMessage = (message, user, time) => {
  return new Promise((resolve) => {
    const newMessage = {
      _id: Date.now().toString(),
      message,
      user,
      time
    };
    
    setTimeout(() => {
      resolve({ status: "ok", data: newMessage });
    }, 300);
  });
};

// Mock delete message function
export const mockDeleteMessage = (messageId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: "ok" });
    }, 300);
  });
};

// Export a flag to determine whether to use mock data or real API
export const useMockData = true;
