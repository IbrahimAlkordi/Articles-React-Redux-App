In the project directory, in VScode terminal, you can run:

`npm install`
to install all the dependencies and the node module file.

 `npm start`
to view the app in your browser.

*this project is a ReactJS Articles Dashboard application,
that allows the user to sign in, view, and filter articles.

when the app run, you should see the Auth component (the login screen)
it contains a form with :
- a username and password input fields.
- a login button it should be Disabled because both input fields are empty .

** the Auth component uses useInput custom hook for both inputs fields,
    and in the useInput there is some states to Handle invalid credentials.

Use the following login credentials to perform a successful login:
- Username: candidate
- Password: P@ssw0rd

* the login API will be excecute after filling out the form (with the valid username and password)
   and pressing the login button.
* you will be Route to the dashboard screen when the login API is successful.

the dashboard screen (the articles component)
-should see a search input field, articles list,and a logout button.
-the articles will be fetched everytime when the articles component starts.
-when you reach the end of the articles list, you should load more articles by calling an
API by clicking the button see more .

- When you type in the search input,the articles should be filtered and display only the articles
that contain the searched pattern in the article title or article description.
- you can clear the searched input.

- On logout press, you should be routed to the login screen.



**product features:
-Use redux to store the login response,the notification,the response of the articles, and the filtered articles.
-use useInput custom hook to handle both inputs fields.
-use useState in the useInput to Handle invalid credentials.


