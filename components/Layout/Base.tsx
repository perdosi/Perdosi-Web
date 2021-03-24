import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const BaseLayout: React.FC<Props> = (props) => (
  <div>
    <div className="layout">{props.children}</div>
    <style jsx global>{`
      .layout {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 1rem;
        background: #E5E5E5;
      }
      @media screen and (min-width: 768px) {
        .layout {
          margin: 0 auto;
          padding: 0;
        }
      }
      img[src=""] {
        visibility:hidden
      }
      @-moz-document url-prefix() {
        img: -moz-loading {
          visibility: hidden
        }
      }
    `}</style>
  </div>
);

export default BaseLayout;
