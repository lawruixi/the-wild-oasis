# The Wild Oasis

![image](https://github.com/user-attachments/assets/046c4a8e-c1dd-4b3a-a601-3559c3ce9db4)

## Introduction
This is a small web app made for employees of a fictional hotel, The Wild Oasis, to track details about bookings and guests. A deployed version (on Netlify) of the app is [here (https://the-wild-oasis-hotel-1.netlify.app)](https://the-wild-oasis-hotel-1.netlify.app), which you can try out for yourself!

Login credentials for the demo app are any of the following:

| Account Name  | Email | Password |
| ------------- | ----- | -------- |
| Fay Kyuzer  | neyefep952@fuzitea.com | abcdefgh |
| Tess Tyuzer  | botiy62318@foraro.com | 12345678 |

## Features
Currently, the following features exist:
1. Authentication system, which you'll need the above credentials to access if using the demo app.
2. Dynamic charts (using [Recharts](https://www.npmjs.com/package/recharts)) showing statistics on the home dashboard.
3. Check in or check out guest bookings, when they arrive and leave the hotel. Also, you can delete bookings.
4. Edit, create or delete cabins in the Cabins panel!
   - Note that there are `NO ACTION` Foreign Key constraints from Bookings' Cabin ID to the Cabin's ID, which means you cannot delete a cabin if there is a booking associated with it.
5. Also, you can make your own user account after logging in via the demo account. Your login credentials are kept safe (no one can access them, including me), but your account may be destroyed if any major updates are made to the app.
6. Update your user account after making it! You can even add an avatar image.
7. Adjustable settings for various parameters like the minimum/maximum nights a guests can stay for, the breakfast price and the maximum guests per booking.
8. Light mode and dark mode! Automatically switches to your browser preference.

## Acknowledgements
This project was made possible thanks to the following technology:
- [React.js](https://react.dev/)
- [React Router](https://reactrouter.com/en/main)
- [Tanstack React Query](https://tanstack.com/query/latest/docs/framework/react/overview)
- [`styled-components`](https://styled-components.com/)
- [`react-icons`](https://react-icons.github.io/react-icons/)
- [date-fns](https://date-fns.org/)
- [react-hot-toast](https://react-hot-toast.com/)
- [Supabase](https://supabase.com/) for its backend database
- [Netlify](https://www.netlify.com/) for the demo app hosting
- [Vite](https://vitejs.dev/) for putting it all together

This project is made as part of the [Ultimate React Course](https://www.udemy.com/course/the-ultimate-react-course/) by [Jonas Schmedtmann](https://codingheroes.io/).
