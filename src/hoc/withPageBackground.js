import PageBackground from "../components/PageBackground";

const withPageBackground = (WrappedComponent) => {
  const WithPageBackground = (props) => {
    return (
      <PageBackground>
        <WrappedComponent {...props} />
      </PageBackground>
    );
  };
  return WithPageBackground;
};

export default withPageBackground;
