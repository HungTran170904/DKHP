import './App.css';
import { API, Amplify, Auth } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
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
function App() {
  const getUserData= async() => {
      const idToken=(await Auth.currentSession()).getIdToken().getJwtToken();
      const apiName = 'APIGateway';
      const path = '/-dkhp';
      const myInit={
        headers: {
          Authorization: idToken
        },
        queryStringParameters: {
            action: "GetAllCourses"
        }
      };
      API.get(apiName, path, myInit)
      .then((response) => {
          const obj=JSON.parse("{"+response+"}");
          console.log(obj.result);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  return (
    <Authenticator loginMechanisms={['email']}>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <button onClick={getUserData}>Call GET API</button><br/>
          <button onClick={signOut}>Sign out</button><br/>
        </main>
      )}
    </Authenticator>
  );
}

export default App;
/*
export const handler = async (event) => {
  // TODO implement
  console.log("Hello");
  let res="error";
  const type=event.params.path.type;
  if(type==="all"){
    res="return all users";
  }
  else if(type==="single"){
    res="return one user";
  }
  event.age+=12;
  const response = {
    statusCode: 200,
    body: JSON.stringify("Name:"+event.body.name+"- Age:"+event.body.age),
    resp: res,
    product_id: event.params.querystring.product_id,
    productName: event.params.querystring.productName
  };
  return response;
};
*/