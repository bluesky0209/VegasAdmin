import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Vegas Admin SignIn"
        description="This is Vegas Admin SignIn page"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
