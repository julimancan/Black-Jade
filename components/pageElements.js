import styled from "@emotion/styled";

export const PageNav = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 7rem;
    margin-left: 0.5rem;
  }
  h1 {
    margin-right: 1rem;
  }
  .page-nav {
    display: flex;
    flex-wrap: wrap;
    max-width: 45%;
    align-items: center;
    @media (min-width: 530px) {
      max-width: 85%;
    }
    ul {
      /* background-color: red; */
      /* width: fit-content; */
      display: flex;
      transform: translateY(5px);
      list-style: none;
    }
  }
`;

export const SelectedOption = styled.li`
  border-bottom: ${({ selected }) => (selected ? "1px solid" : "none")};
  cursor: pointer;
  margin-right: 0.5ch;
`;
