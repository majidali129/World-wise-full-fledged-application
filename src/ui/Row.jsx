import { css, styled } from "styled-components";

const Row = styled.div`
    display: flex;
    ${(props) => props.type === 'horizontal' && css`
    align-items: center;
    justify-content: space-between;

    `}

    ${(props) => props.type === 'vertical' && css`
    flex-direction: column;
    gap: 8px;

    `}
`
Row.defaultProps = {
    type: 'vertical'
}

export default Row;