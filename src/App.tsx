import { Authenticated, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import routerProvider, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import "./App.css";
// MODO DESENVOLVIMENTO: Usar authProvider.dev para testar sem banco de dados
// Para produção, trocar para: import authProvider from "./authProvider";
import authProvider from "./authProvider.dev";
import { AlmaIcon } from "./components/alma/logo";
import { ErrorComponent } from "./components/refine-ui/layout/error-component";
import { Layout } from "./components/refine-ui/layout/layout";
import { Toaster } from "./components/refine-ui/notification/toaster";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";

// Pages
import { ForgotPassword } from "./pages/forgot-password";
import { Login } from "./pages/login";
import { Register } from "./pages/register";

// CRM Pages (serão criadas)
import { Dashboard } from "./pages/dashboard";
import { PipelineKanban } from "./pages/pipeline";
import { InboxList, InboxConversation } from "./pages/inbox";
import { ContactList, ContactShow, ContactCreate, ContactEdit } from "./pages/contacts";
import { CompanyList, CompanyShow, CompanyCreate, CompanyEdit } from "./pages/companies";
import { TaskList, TaskCreate, TaskEdit } from "./pages/tasks";
import { Settings } from "./pages/settings";
import { Onboarding } from "./pages/onboarding";

import { supabaseClient } from "./utility";

// Ícones para os recursos
import {
  LayoutDashboard,
  KanbanSquare,
  Inbox,
  Users,
  Building2,
  CheckSquare,
  Settings as SettingsIcon,
} from "lucide-react";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ThemeProvider defaultTheme="dark">
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider(supabaseClient)}
              liveProvider={liveProvider(supabaseClient)}
              authProvider={authProvider}
              routerProvider={routerProvider}
              notificationProvider={useNotificationProvider()}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "QchoCp-6iMBa8-1WSWDE",
                title: {
                  text: "CRM Alma",
                  icon: <AlmaIcon size="sm" />,
                },
                liveMode: "auto",
              }}
              resources={[
                // Dashboard
                {
                  name: "dashboard",
                  list: "/dashboard",
                  meta: {
                    label: "Dashboard",
                    icon: <LayoutDashboard className="h-4 w-4" />,
                  },
                },
                // Pipeline (Kanban)
                {
                  name: "pipeline",
                  list: "/pipeline",
                  meta: {
                    label: "Pipeline",
                    icon: <KanbanSquare className="h-4 w-4" />,
                  },
                },
                // Inbox
                {
                  name: "inbox",
                  list: "/inbox",
                  show: "/inbox/:id",
                  meta: {
                    label: "Inbox",
                    icon: <Inbox className="h-4 w-4" />,
                  },
                },
                // Contacts
                {
                  name: "contacts",
                  list: "/contacts",
                  create: "/contacts/create",
                  edit: "/contacts/edit/:id",
                  show: "/contacts/show/:id",
                  meta: {
                    label: "Contatos",
                    icon: <Users className="h-4 w-4" />,
                    canDelete: true,
                  },
                },
                // Companies
                {
                  name: "companies",
                  list: "/companies",
                  create: "/companies/create",
                  edit: "/companies/edit/:id",
                  show: "/companies/show/:id",
                  meta: {
                    label: "Empresas",
                    icon: <Building2 className="h-4 w-4" />,
                    canDelete: true,
                  },
                },
                // Tasks
                {
                  name: "tasks",
                  list: "/tasks",
                  create: "/tasks/create",
                  edit: "/tasks/edit/:id",
                  meta: {
                    label: "Tarefas",
                    icon: <CheckSquare className="h-4 w-4" />,
                    canDelete: true,
                  },
                },
                // Settings
                {
                  name: "settings",
                  list: "/settings",
                  meta: {
                    label: "Configurações",
                    icon: <SettingsIcon className="h-4 w-4" />,
                  },
                },
              ]}
            >
              <Routes>
                {/* Authenticated Routes */}
                <Route
                  element={
                    <Authenticated
                      key="authenticated-inner"
                      fallback={<CatchAllNavigate to="/login" />}
                    >
                      <Layout>
                        <Outlet />
                      </Layout>
                    </Authenticated>
                  }
                >
                  {/* Redirect root to dashboard */}
                  <Route
                    index
                    element={<NavigateToResource resource="dashboard" />}
                  />

                  {/* Dashboard */}
                  <Route path="/dashboard" element={<Dashboard />} />

                  {/* Pipeline (Kanban) */}
                  <Route path="/pipeline" element={<PipelineKanban />} />

                  {/* Inbox */}
                  <Route path="/inbox">
                    <Route index element={<InboxList />} />
                    <Route path=":id" element={<InboxConversation />} />
                  </Route>

                  {/* Contacts */}
                  <Route path="/contacts">
                    <Route index element={<ContactList />} />
                    <Route path="create" element={<ContactCreate />} />
                    <Route path="edit/:id" element={<ContactEdit />} />
                    <Route path="show/:id" element={<ContactShow />} />
                  </Route>

                  {/* Companies */}
                  <Route path="/companies">
                    <Route index element={<CompanyList />} />
                    <Route path="create" element={<CompanyCreate />} />
                    <Route path="edit/:id" element={<CompanyEdit />} />
                    <Route path="show/:id" element={<CompanyShow />} />
                  </Route>

                  {/* Tasks */}
                  <Route path="/tasks">
                    <Route index element={<TaskList />} />
                    <Route path="create" element={<TaskCreate />} />
                    <Route path="edit/:id" element={<TaskEdit />} />
                  </Route>

                  {/* Settings */}
                  <Route path="/settings" element={<Settings />} />

                  {/* 404 */}
                  <Route path="*" element={<ErrorComponent />} />
                </Route>

                {/* Public Routes (Auth) */}
                <Route
                  element={
                    <Authenticated
                      key="authenticated-outer"
                      fallback={<Outlet />}
                    >
                      <NavigateToResource />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/onboarding" element={<Onboarding />} />
                </Route>
              </Routes>

              <Toaster />
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </ThemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
