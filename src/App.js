import './App.css';
import { API, Amplify, Auth } from 'aws-amplify';
import { Authenticator, Heading, Text, useTheme } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import {BrowserRouter , Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import RegisteredCoursesPage from './pages/RegisteredCoursesPage';
import AllCoursesMainPage from './pages/AllCoursesMainPage';
import WelcomePage from './pages/WelcomePage';
import StudentInfoPage from './pages/StudentInfoPage';
import ErrorPage from "./pages/Errorpage";
Amplify.configure({
  aws_project_region: 'us-east-1',
  aws_cognito_region: 'us-east-1', 
  aws_user_pools_id: 'us-east-1_OtMx840rK', 
  aws_user_pools_web_client_id: '2jhoevm8h0sf0lg0vlrr9opvt5', 
  aws_mandatory_sign_in: 'enable',
  aws_cloud_logic_custom: [
    {
      name: 'APIGateway',
      endpoint: ' https://5p26j453zc.execute-api.us-east-1.amazonaws.com/v1', 
      region: 'us-east-1'
    }
  ]
});
const formFields = {
  confirmVerifyUser: {
    confirmation_code: {
      label: 'New Label',
      placeholder: 'Enter your Confirmation Code:',
      isRequired: false,
    },
  },
};

const components = {
  VerifyUser: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },

  ConfirmVerifyUser: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
};
function App() {
  return (
    <Authenticator loginMechanisms={['email']} formFields={formFields} components={components} hideSignUp={true}>
      {({ signOut }) => (
        <div className="MainApp">
            <BrowserRouter>
                <NavBar SignOut={signOut}/>
                <Routes>
                    <Route exact path="/" element={<WelcomePage />}/>
                    <Route path="/AllCourses" element={<AllCoursesMainPage />}/>
                    <Route path="/RegisteredCourses" element={<RegisteredCoursesPage />}/>
                    <Route path="/StudentInfo" element={<StudentInfoPage/>}/>
                    <Route path="/*" element={<ErrorPage/>}/>
                </Routes>
            </BrowserRouter>
            </div>
      )}
    </Authenticator>
  );
}

export default App;
