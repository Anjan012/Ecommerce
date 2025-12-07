import { Link } from "react-router";
import { Header } from "../components/Header";
import "./Error.css";

export function Error({cart}) {
    return (
        <>
            <title>Error</title>

            <Header cart={cart}/>

            <div className="decorative-circles">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
            </div>

            <div className="container">
                <div className="error-code">404</div>

                <div className="error-icon">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="100" cy="100" r="90" fill="white" opacity="0.95" />

                        <circle cx="70" cy="80" r="8" fill="rgb(8, 79, 45)" />

                        <circle cx="130" cy="80" r="8" fill="rgb(8, 79, 45)" />

                        <path d="M 60 140 Q 100 120 140 140"
                            stroke="rgb(8, 79, 45)"
                            strokeWidth="6"
                            fill="none"
                            strokeLinecap="round" />

                        <ellipse cx="70" cy="95" rx="4" ry="8" fill="rgba(8, 79, 45, 0.4)">
                            <animate attributeName="cy" values="95;110;95" dur="2s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
                        </ellipse>
                    </svg>
                </div>

                <h1>Oops! Page Not Found</h1>
                <p>The page you're looking for seems to have wandered off. Don't worry, let's get you back on track!</p>

                <div className="btn-container">
                    <Link to="/" className="btn btn-primary">Go Home</Link>
                    <Link to="/" className="btn btn-secondary">Go Back</Link>
                </div>
            </div>
        </>
    )
}