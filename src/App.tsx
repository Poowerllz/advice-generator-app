import styled from "styled-components";
import divisorDesktop from "./images/pattern-divider-desktop.svg";
import divisorMobile from "./images/pattern-divider-mobile.svg";
import diceIcon from "./images/icon-dice.svg";
import { useEffect, useState } from "react";

function App() {
  type res = {
    slip: {
      id: number;
      advice: string;
    };
  };

  const [texts, setTexts] = useState<res>();
  const [isMobile, setIsMobile] = useState<boolean>();

  const Container = styled.div`
    background: hsl(218, 23%, 16%);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const Box = styled.div`
    background: hsl(217, 19%, 24%);
    padding: 32px 32px 0px 32px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: ${isMobile ? "92vw" : "508px"};
  `;

  const Button = styled.div`
    background-color: hsl(150, 100%, 66%);
    width: 52px;
    height: 52px;
    position: absolute;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: 300ms all;

    &&:hover {
      background-color: hsl(150, 74.03846153846155%, 59.21568627450981%);
      animation: anime infinite 0.6s;
    }

    @keyframes anime {
      to {
        transform: rotate(0turn);
      }

      from {
        transform: rotate(1turn);
      }
    }
  `;

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 375);
    }
    handleResize();

    window.addEventListener("resize", handleResize);

    getNewText();
  }, []);

  const getNewText = async () => {
    const response: res = await fetch("https://api.adviceslip.com/advice").then(
      (res) => res.json()
    );

    setTexts(response);
  };

  return (
    <Container>
      <Box>
        <h4
          style={{
            color: "hsl(150, 100%, 66%)",
            fontSize: "12px",
            margin: "0",
            fontWeight: '500'
          }}
        >
          A D V I C E #{texts?.slip.id || "00"}
        </h4>

        <h4
          style={{
            color: "#ffffff",
            fontSize: "27px",
            margin: "0",
            marginTop: "16px",
            textAlign: "center",
            
          }}
        >
          "{texts?.slip.advice || "Oops, our servers are down."}"
        </h4>
        <img
          src={isMobile ? divisorMobile : divisorDesktop}
          style={{ marginTop: "32px", marginBottom: "48px" }}
        />
        <div
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "16px",
          }}
        >
          <Button onClick={() => getNewText()}>
            <img src={diceIcon} />
          </Button>
        </div>
      </Box>
    </Container>
  );
}

export default App;
