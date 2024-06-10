Hi Everyone, Hope the Pseudo code helps in understanding Functionality i have implemented in my code!

Technologies used in code: (Both FrontEnd and BackEnd)

FrontEnd - React JS, React Redux Toolkit, Redux Persist, Axios, React-Router-Dom, HTML, CSS, MUI

BackEnd - Node JS, Express JS, MONGODB, CORS, dotEnv, cookie-parser, Node Mailer

I will let you know how the app flow be:

Applies all
*{
Operations are not only local they are actively connected to server and database to instancely provide the updated values
}

1. Log-In screen:
   https://main--magenta-sunflower-d500a9.netlify.app/

// Enter the Credentials and Click Log-In Button

IF Entered Credentials are equal to user available in database:
IF Entered mail id or user name is not verified:
UI Shows "Validation Pending! to validate Click Validate"
IF clicked on `Validate` hyper link:
it will direct to `/validate` page - where you need to enter pin
IF Pin Entered is correct:
navigates to login page `/`
ELSE IF Pin is Empty or less than 4 digit:
UI Shows "Pin Cannot be Empty or Less than 4 Digit!!!"
ELSE IF Pin is Not Valid:
UI Shows "Invalid PIN Number"
ELSE:
login to the application (while logging in it generates `token` and stores in browser cookies), pulls the gas providers details from database and user details to keep the app
ready to use
ELSE IF Entered Credentials are NOT equal to user available in database:
UI shows "Invalid Credentials, Please Retry Login!!!" in bottom red color
ELSE IF Any of Entered Credentials are EMPTY:
UI shows "One or More Input Field is Empty!!!"
// Click `Create An Account` button

IF Any of Entered Credentials are EMPTY:
UI shows "One or More Input Field is Empty!!!"
ELSE IF mail address not ending with @gmail.com
UI shows "Enter Valid GMAIL Signature _@gmail_ !!!"
ELSE IF mail id already exist in user database:
UI shows "User Already Exist, Try Logging In!!!"
ELSE IF Entered Credentials are new and valid:
UI Shows Alert saying Account successfully created meanwhile
BackEnd generates a pin and sends to entered mail address and then page will direct to login
page to login in
// RESET Password
Clicked on `Forgot Password` element:

First enter mail id and click Generate Pin
IF Entered Mail id is valid and `Generate Pin` hyperlink is clicked:
UI Shows Alert Prompt saying Pin Sent to Registered mail address
..Once got pin Enter pin and password:
If Any of Entered Credentials are EMPTY:
UI shows "Pin or Password Cannot be Empty or Less than 4 Digit!!!"
ELSE IF Invalid PIN entered :
UI Shows "Invalid Pin Number"
ElSE IF PIN is Correct and Password is Entered:
navigates to Login In page

// Once Logged In

You will able to see Nav bar and Content session

In Nav Bar you can see Company Logo, Hyperlinks for page (Services, Profile, History, LogOut)

the Starting Content page is `/Info/Services` which shows the drop to filter gas Category and providers

-- Dropdown --
Default value
Gas Category - "All"
Gas Provier - "All"

If Gas Category Selected == "All":
UI Shows All Available Providers
ELSE IF Gas Category Selected == Any SubCategory :
UI Shows All Providers Within that Gas Category
ELSE IF Gas Category Selected == "All" AND Gas Provider == Any SubProvider:
UI Shows All SAME Providers from all GAS Category
ELSE IF Gas Category Selected == Any SubCategory AND Gas Provider == Any SubProvider:
UI Shows Matching Providing from Matching Gas Category

// Booking Slot
IF Once any GAS Provider Card is Clicked or Selected (`/Info/Services`):
navigates to `/Info/booking/slot` page where the previously selected information are captured
slots displayed to selected

Date Slot are dropdown from current+1 date to 5 days

3 Times Slots are provided once clicked with navigate to `/Info/booking/details`

// Booking details
Displays all details gathered from `/Info/Services` and `/Info/booking/slot` in a flow

it will also display 3 quantities to purchase. By default none is selected to purchase

IF Clicked Order AND Quantity Card Not Selected :
UI Show "Select a Quantity to Book"
ELSE Clicker Order:
Alert Prompts saying BOOKING IS SUCCESSFUL
// History - Place to see all Booked Items:

IF No Items booked:
UI Shows "No Booked History to Display"
ELSE:
UI Displays all Booked items in Card
IF HOVERED Over:
UI Shows `Cancel Order` to cancel the order
IF Cancel Order is Clicked:
UI Shows a Page Asking to confirm Yes or No:
IF Yes:
Cancels Order
IF No:
navigates back (does None)

// Profile - to see current user details

// LogOut - When Clicked will alert with Yes or No if clicked Yes, will Log out and navigates to
Login Page
