# Simple task management app #

### How to use ###
1. **Clone the Repository:**
    ```bash
    git clone https://github.com/rezadrian01/task-management.git
    ```

2. **Install Dependencies**

    Navigate to the client and server directories in separate terminals, then install the dependencies:
    open the first terminal and run:
    ```bash
    cd client
    npm install
    ```
    open the second terminal and run:
    ```bash
    cd server
    npm install
    ```

3. **Fill the Environment Variables**

     Create a .env file in both directories and populate it with the necessary environment variables:
  
     server directory
     ```.env
     GOOGLE_CLIENT_ID = your Google client ID
     GOOGLE_CLIENT_SECRET = your Google client secret
     PORT = your backend server port
     SECRET_KEY = your JWT secret key
     DOMAIN_API = your backend server URL
     CLIENT_DOMAIN = your frontend server URL 
     ```
     
     client directory
      ```.env
      VITE_DOMAIN_API = your backend server URL
      VITE_DOMAIN_FRONTEND = your frontend server URL
      ```

4. **Run the Application**
   
    To start the application run the following command in each terminal
    ```bash
    npm run dev
    ```
    Ensure you run this command in both 'client' and 'server' directories.

#### finally you can start using this app! ####
