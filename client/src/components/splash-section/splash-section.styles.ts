// import styled from styled-components;
import styled from "styled-components"

export const SplashContainer = styled.div`
    display : flex;
    justify-content : space-between;
    padding : 5rem 4rem 7rem 9rem;
    display : flex;
    gap : 2rem;
    position : relative;

    @media screen and (max-width : 1035px) and (min-width : 800px) {
        padding : 3rem 4rem 1rem 4rem;
    }
    @media screen and (max-width : 800px) {
        padding : 3rem 2rem 1rem 2rem;
    }

`

export const SplashLeft = styled.div`
    display : flex;
    flex-direction : column;

    h2 {
        inline-size: 28rem;
        overflow-wrap: break-word;
        font-size : 3rem;
        font-family: 'Space Grotesk';
        font-style: normal;
        font-weight: 700;
        line-height: 4rem;
        color: #2C2C2C;
        
        @media screen and (max-width : 800px) and (min-width : 649px) {
            font-size : 2.5rem;
            inline-size: 24rem;
        }

        @media screen and (max-width : 649px) {
            display : inline;
            font-size : 2.7rem;
            inline-size : 10rem;
            overflow-wrap: break-word;
        }

        img {
            width: 2.4rem;
            height: 2.3rem;
        }

    }

    p {
        font-family: 'Space Grotesk';
        font-style: normal;
        font-weight: 400;
        color: #2C2C2C;
        inline-size: 23rem;
        overflow-wrap: break-word;
        line-height : 1.9rem;
        padding : 1.5rem 0rem 0rem 0rem;
    }

    button {
        background: #2C2C2C;
        width : 9rem;
        justify-content : center;
        display : flex;
        align-items : center;
        padding : 0.6rem 1rem;
        gap: 0.6rem;
        border-radius : 0.25rem;
        margin : 1rem 0rem;
        cursor : pointer;

         span {
            font-family: 'Space Grotesk';
            font-style: normal;
            font-weight: 400;
            color : #FFFFFF;
         }
         img {
            width : 1.2rem;
         }
    }
`

export const ImageMap = styled.img`
   position : absolute;
   right : 11.24rem;
   top: 4rem;
`