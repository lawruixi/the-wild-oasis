import styled, { css } from "styled-components";

const Row = styled.div`
    display: flex;

    ${(props) => {
        switch (props.type) {
            case "horizontal":
                return css`
                    justify-content: space-between;
                    align-items: center;
                `;
            case "vertical":
                return css`
                    flex-direction: column;
                    gap: 1.6rem;
                `;
        }
    }}
`;

Row.defaultProps = {
    type: "vertical",
};

export default Row;
