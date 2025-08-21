import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
* {
	scrollbar-width: thin;
}

/* *::-webkit-scrollbar {
	width: 10px;
} */
*scrollbar {
	width: 10px;
}
*::-webkit-scrollbar-button {
	display: none;
}
*::-webkit-scrollbar-track {
	background-color: #f7f7f7;
	box-shadow: inset 0px 0px 4px rgba(0, 0, 0, .9);//rgba(128, 128, 128, 0.507);
	border-radius: 3px;
	margin: 2px 0;
}
*::-webkit-scrollbar-thumb {
	box-shadow: inset 0px 0px 4px rgba(128, 128, 128, 0.514);
	background-color: rgba(221, 221, 221, 0.5);

	border-radius: 3px;

	&:hover {
		background-color: rgba(190, 190, 190, 0.5);
	}

}

* {
  margin: 0;
  padding: 0;
  /* overflow: hidden; */
  /* font-family: "Bitter", serif; */
  font-family: "Roboto", sans-serif;

  
  font-weight: normal;
  font-style: normal;
  font-size: 16px;


  box-sizing: border-box;
} 

body {
  /* width: 100vw;
  height: 100vh; */
  background-color: transparent;
  /* font-family: "Roboto", sans-serif; */
  #root {
    background-color: transparent;
    width: 100%;
    height: 100vh;
  }
}



`