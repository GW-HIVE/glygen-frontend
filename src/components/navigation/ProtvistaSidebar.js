import "../../css/protvista.css";

import React from "react";

const ProtvistaSidebar = ({ data, handleExpand, expanded }) => {
  return (
    <div class="main menu">
      <nav class="main-nav sidebarpadding">
        <ul class="main-nav__list">
          <li class="nav-item1 nav-nav  legendlist glycotrack">
            <a class="nav-link" href="#">
              Navigation
            </a>
          </li>
          <li class="nav-item nav-seq glycotrack legendlist">
            <a class="nav-link" href="#">
              Sequence
            </a>
          </li>
          <li className="nav-item nav-track nav-combinetrack legendlist">
            <a class="nav-link" href="#" onClick={handleExpand}>
              Glycosylation &nbsp;&nbsp;
            </a>
          </li>

          <li
            id="reported_Nglycan"
            className={
              "nav-item nav-track indentsubnav glycotrack legendlist" +
              (expanded ? "" : " hidden")
            }
          >
            <a
              href="#"
              class="nav-link"
              data-toggle="tooltip"
              title="N-Glycans reported at indicated site!"
            >
              N-Glycan
            </a>
          </li>
          <li
            id="nonreported_Nglycan"
            className={
              "nav-item nav-track indentsubnav glycotrack  legendlist" +
              (expanded ? "" : " hidden")
            }
          >
            <a
              href="#"
              class="nav-link"
              data-toggle="tooltip"
              title="Sites informatically predicted to be glycosylated"
            >
              N-Glycan-Site
            </a>
          </li>
          <li
            id="reported_Oglycan glycotrack"
            className={
              "nav-item nav-track indentsubnav glycotrack  legendlist" +
              (expanded ? "" : " hidden")
            }
          >
            <a
              href="#"
              class="nav-link"
              data-toggle="tooltip"
              title="O-Glycans reported at indicated site"
            >
              O-Glycan
            </a>
          </li>
          <li
            id="nonreported_Oglycan"
            className={
              "nav-item nav-track indentsubnav glycotrack  legendlist" +
              (expanded ? "" : " hidden")
            }
          >
            <a
              href="#"
              class="nav-link"
              data-toggle="tooltip"
              title="Sites informatically predicted to be glycosylated"
            >
              O-Glycan-Site
            </a>
          </li>
          <li
            id="reported_sequon"
            className={
              "nav-item nav-track indentsubnav glycotrack.nav-link  lineborder" +
              (expanded ? "" : " hidden")
            }
          >
            <a
              href="#"
              className="nav-link lineborder"
              data-toggle="tooltip"
              title="Consensus sequence for N-glycosylation"
            >
              N-Glycan-Sequon
            </a>
          </li>
          <li class="nav-item nav-track">
            <a
              href="#"
              className="nav-link lineborder"
              data-toggle="tooltip"
              title="The action or process of mutating."
            >
              Mutation
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProtvistaSidebar;
