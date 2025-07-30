import JoinForm from "../components/form/JoinForm";

function JoinPage() {
  const formWrap = {
    margin: "0 auto",
    width: "80%",
    background: "#fefefe",
  };
  return (
    <div style={formWrap}>
      <div>
        <h1>회원가입</h1>
        <JoinForm />
      </div>
    </div>
  );
}

export default JoinPage;
