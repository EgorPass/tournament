

export const lightTheme = {

  loader: {
    bg: "rgba( 55, 55, 55, .5 )",
    color: "gray",
    secondaryColor: "white",
  },

  font: {
    nav: "#000000",
    navHover: "#000044",
    navLink: "#000044",
    base: "#000000",
    input: "#000000",
    placeholder: "#545454",
  },

  bg: {
    cover: "#f9f9f9",
    nav: {
      border: "rgba(0, 0, 0, .15)",
      container: {
        phone: "#E3E3E3",         //
        desctop: "transparent"    //
      },
      link: {
        phone: "#F0F0F0",
        desctop: "transparent"
        },
      hover: "#F7F7F7",
      navLink: "#e7e7e7",
      marker: "#525252",
      checker: "#222222",
    },
    input: {
      field: "#F6F6F6",
      inputBg: "#EEEEEE",
    },
    button: "#E8E8E8",
  },

  textShadow: {
    head: "rgba(0, 0, 0, .25)",
    title: "",
    input: "",
    placeholder: "",
  },

  boxShadow: {
    base: "rgba(0, 0, 0, .25)",
    inputTextField: "rgba(0, 0, 0, .25)",
    button: "rgba(0, 0, 0, .25)",
  },

  border: {
    base: "rgba(0, 0, 0, .26)",
    button: "#d1d1d1",
    // input: "rgba(0, 0, 0, .26)"
  },
}

export const darkTheme = {
  
  loader: {
    bg: "rgba( 200, 200, 200, .2 )",
    color: "white",
    secondaryColor: "grat",
  },

  font: {
    nav: "#EDFFEF",
    navHover: "#99ff99",
    navLink: "#99ff99",
    base: "#EDFFEF",
    input: "#EDFFEF",
    placeholder: "#AAAAAA",
  },

  bg: {
    cover: "#363636",
    nav: {
      border: "rgba(105, 105, 105, .26)",
      container: {
        phone: "#080808", //
        desctop: "transparent"
      },
      link: {
        phone: "#1a1a1a", //
        desctop: "transparent"
      },
      hover: "#111111", //
      navLink: "#1a1a1a", //
      marker: "#c2c2c2", //
      checker: "#c2c2c2",
    },
    input: {
      field: "#363636",
      inputBg: "#515151",
    },
    button: "#414141",
  },

  textShadow: {
    head: "rgba(6, 6, 6, 1)",
    title: "",
    input: "",
    placeholder: "",
  },

  boxShadow: {
    base: "rgba(116, 134, 121, .25)",
    inputTextField: "rgba(0, 0, 0, .25)",
    button: "rgba(116, 134, 121, .25)",
  },

  border: { 
    base: "rgba(105, 105, 105, .26)",
    button: "rgba(105, 105, 105, .26)",
  },

}

export const baseTheme = {

  type: "light",
  themeColors: lightTheme,

  media: {
    tablet: "(max-width: 768px) and (min-width: 450px)",
    desc_min: "(min-width: 768px)",
    // desc_mid: "(min-width: 1280px)",
    // desc_largh: "(min-width: 1440px)"

    min: "(max-width: 449px)",
    mid: "(min-width: 450px) and (max-width: 767px)",
    large: "(min-width: 768px)",
    max: "(min-width: 1024px)"  
  },

  borderRadius: {
    inputField: "5px",
  },

  
  nav: {
    font: {
      st: "",
      sz: {
        ph: "18px",
        tb: "18px",
        ds: "18px",
      },
      wg: {
        ph: "500",
        tb: "500",
        ds: "500",
      },
    },
    navCont: {
      wd: {
        ph: "317px",
        tb: "317px",
        
        ds: "317px",
      },
      pd: {
        ph: "0 6px 0 20px",
        tb: "0 6px 0 20px",
        
        ds: "0 6px 0 20px",
      },

    },
   
    outerLists: {
      wd: {
        ph: "276px",
        tb: "276px",
       
        ds: "276px",
      },
      pd: {
        ph: "10px 0 10px 0",
        tb: "10px 0 10px 0",
        
        ds: "10px 0 10px 0",
      },
    },
    innerLists: {
      pd: {
        ph: "0 0 0 17px",
        tb: "0 0 0 17px",
       
        ds: "0 0 0 17px",
      },
    },
    listItem: {
      mr: {
        ph: "8px 0",
        tb: "8px 0",
        
        ds: "8px 0",
      }
    },
    titleGrid: {
      pd: {
        ph: "9px 0 7px 12px",
        tb: "9px 0 7px 12px",
        ds: "9px 0 7px 12px",
      }
    },
    navTitle: {

    }



  },

  main: {

    button: {
      width: "105px",
      height: "40px",
      padding: "7px 0px",
      radius: "16px",
      border: "1px",
    }
  },

  
  
  }

    // media: {
    //   phone: "(max-width: 450px)",
    //   tablet: "(max-width: 768px) and (min-width: 450px)",
    //   desc_min: "(min-width: 768px)",
    //   desc_mid: "(min-width: 1140px)",
    //   desc_largh: "(min-width: 1440px)"
    // },