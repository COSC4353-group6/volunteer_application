
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EventScreen() {

  const params = useParams();
  const { slug } = params;

  
    return (
      <section >
       
        <h1> EventScreen {slug}</h1>
      </section>
    );
  }