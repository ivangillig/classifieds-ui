// pages/index.js
import DefaultLayout from '../components/Layout/DefaultLayout';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

const HomePage = () => {
  return (
    <DefaultLayout title="Home Page">
      <Card title="Welcome to Classifieds App">
        <p>
          This is the home page. You can navigate to the{" "}
          <a href="/login">Login</a> or the <a href="/main">Main Page</a>.
        </p>
        <Button label="Go to Login" icon="pi pi-sign-in" className="p-button-outlined" onClick={() => window.location.href = "/login"} />
        <Button label="Go to Main Page" icon="pi pi-arrow-right" className="p-button-outlined p-ml-2" onClick={() => window.location.href = "/main"} />
      </Card>
    </DefaultLayout>
  );
};

export default HomePage;
