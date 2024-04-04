import "./App.css";
import type { LoaderFunctionArgs } from "react-router-dom";
import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  redirect,
  useFetcher,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";
import { fakeAuthProvider } from "./auth";
import { PoweroffOutlined, LoginOutlined } from "@ant-design/icons";
import LoginComponent from "./components/Login.component";
import { Button, Divider, Space } from "antd";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    loader() {
      return { user: fakeAuthProvider.username };
    },
    Component: Layout,
    children: [
      {
        index: true,
        Component: PublicPage,
      },
      {
        path: "login",
        action: loginAction,
        loader: loginLoader,
        Component: LoginComponent,
      },
      {
        path: "protected",
        loader: protectedLoader,
        Component: ProtectedPage,
      },
    ],
  },
  {
    path: "/logout",
    async action() {
      // We signout in a "resource route" that we can hit from a fetcher.Form
      await fakeAuthProvider.signout();
      return redirect("/");
    },
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

function Layout() {
  const { isAuthenticated } = fakeAuthProvider;
  const navigate = useNavigate();

  return (
    <div>
      <AuthStatus />

      <Space style={{ margin: "1vh 0" }}>
        <Button onClick={() => navigate("/")}>Public Page</Button>
        {isAuthenticated && (
          <Button
            onClick={() => {
              navigate("/protected");
            }}
          >
            Protected Page
          </Button>
        )}
      </Space>

      <Divider style={{ margin: "1vh 0" }} />

      <Outlet />
    </div>
  );
}

function AuthStatus() {
  let { user } = useRouteLoaderData("root") as { user: string | null };
  let fetcher = useFetcher();
  const navigate = useNavigate();

  let isLoggingOut = fetcher.formData != null;

  function toLogin() {
    navigate("/login");
  }

  return (
    <div className="App-header">
      {!user ? (
        <>
          <p>Você não está logado!</p>
          <fetcher.Form method="post" action="/login">
            <Button
              htmlType="submit"
              type="default"
              loading={isLoggingOut}
              onClick={toLogin}
            >
              <LoginOutlined />
            </Button>
          </fetcher.Form>
        </>
      ) : (
        <>
          <p>Bem vindo {user}!</p>
          <fetcher.Form method="post" action="/logout">
            <Button htmlType="submit" type="default" loading={isLoggingOut}>
              <PoweroffOutlined />
            </Button>
          </fetcher.Form>
        </>
      )}
    </div>
  );
}

async function loginAction({ request }: LoaderFunctionArgs) {
  let formData = await request.formData();
  let username = formData.get("username") as string | null;

  // Validate our form inputs and return validation errors via useActionData()
  if (!username) {
    return {
      error: "You must provide a username to log in",
    };
  }

  try {
    await fakeAuthProvider.signin(username);
  } catch (error) {
    return {
      error: "Invalid login attempt",
    };
  }

  let redirectTo = formData.get("redirectTo") as string | null;
  return redirect(redirectTo || "/");
}

async function loginLoader() {
  if (fakeAuthProvider.isAuthenticated) {
    return redirect("/");
  }
  return null;
}

function PublicPage() {
  return <h3>Public</h3>;
}

function protectedLoader({ request }: LoaderFunctionArgs) {
  // If the user is not logged in and tries to access `/protected`, we redirect
  // them to `/login` with a `from` parameter that allows login to redirect back
  // to this page upon successful authentication
  if (!fakeAuthProvider.isAuthenticated) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }
  return null;
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}
