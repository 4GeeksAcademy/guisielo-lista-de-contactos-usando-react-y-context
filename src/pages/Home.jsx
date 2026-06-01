import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";


export const Home = () => {

  const {store, dispatch} =useGlobalReducer()

	return (
		<div className="text-center mt-5">
			<p> <img src={rigoImageUrl} /> </p>
			<Link to="/contacts" className="btn btn-primary">
        		Hazme click aquí para llevarte a la página de contactos
      		</Link>
		</div>
	);
}; 