import styled from "@emotion/styled";

export const PageNav = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 6rem;
    margin-left: 0.5rem;
  }
  h1 {
    margin-right: 1rem;
  }
  .page-nav {
    display: flex;
    flex-wrap: wrap;
    max-width: 100px;
    align-items: center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    @media (min-width: 800px) {
      margin-left: 2ch;
    }
    ul {
      display: flex;
      position: relative;
      left: 70%;
      transform: translateY(5px) translateX(-50%);
      list-style: none;
    }
  }
`;

export const SelectedOption = styled.li`
  border-bottom: ${({ selected }) => (selected ? "1px solid" : "none")};
  cursor: pointer;
  margin-right: 2ch;
  position: relative;
  text-transform: capitalize;
  &::after {
    content: "";
    width: 0.5ch;
    height: 0.1px;
    background: black;
    position: absolute;
    right: -1.25ch;
    top: 50%;
    transform: translateY(-50%);
  }
  &:last-child:after {
    display: none;
    margin-right: 0;
  }
`;
