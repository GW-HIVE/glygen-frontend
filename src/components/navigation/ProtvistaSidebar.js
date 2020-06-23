import React from "react";
import "../../css/protvista.css";

// $(".hover").hover(
// 	function hoverIn() {
// 		var id = $(this).attr("data-highlight");
// 		$("#" + id).css("background-color", "rgba(255,255,0,0.3)");
// 	},
// 	function hoverOut() {
// 		$(".hover-style").css("background-color", "inherit");
// 	}
// );
// hide and show n-glycan and o-glycan separate track or combined track

const ProtvistaSidebar = ({ data, handleExpand, expanded }) => {
  return (
    <div class="main menu">
      <nav class="main-nav">
        <ul class="main-nav__list">
          <li class="nav-item1 nav-nav">
            <a class="nav-link" href="#">
              Navigation
            </a>
          </li>
          <li class="nav-item nav-seq">
            <a class="nav-link" href="#">
              Sequence
            </a>
          </li>
          <li className="nav-item nav-track nav-combinetrack">
            <a class="nav-link" href="#" onClick={handleExpand}>
              Glycosylation &nbsp;&nbsp;
              <i
                class="fa fa-caret-right"
                id="arrowanimation"
                aria-hidden="true"
              ></i>
            </a>
          </li>
          <li
            id="reported_Nglycan"
            className={
              "nav-item nav-track indentsubnav" + (expanded ? "" : " hidden")
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
            class="nav-item nav-track hidden indentsubnav"
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
            id="reported_Oglycan"
            class="nav-item nav-track hidden indentsubnav"
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
            class="nav-item nav-track hidden indentsubnav"
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
            class="nav-item nav-track hidden indentsubnav"
          >
            <a
              href="#"
              class="nav-link"
              data-toggle="tooltip"
              title="Consensus sequence for N-glycosylation"
            >
              N-Glycan-Sequon
            </a>
          </li>
          <li class="nav-item nav-track">
            <a
              href="#"
              class="nav-link"
              data-toggle="tooltip"
              title="The action or process of mutating."
            >
              Mutation
            </a>
          </li>
        </ul>
      </nav>

      <div class="main-content">
        <div class="row">
          <div class="col-md-6 col-sm-6"> </div>
          <div class="col-md-3 col-sm-3"></div>
          <div class="col-md-3 col-sm-3">
            <ol>
              <li>
                <span class="super1 hover" data-highlight="Ntrack_withImage">
                  &#9679;
                  <span class="superx">
                    <>N-Glycan</>
                  </span>
                </span>
              </li>
              <li>
                <span class="super2 hover" data-highlight="Ntrack_withnoImage">
                  &#9650;
                  <span class="superx">
                    <>N-Glycan-Site</>
                  </span>
                </span>
              </li>
              <li>
                <span class="super3 hover" data-highlight="Otrack_withImage">
                  &#9679;
                  <span class="superx">
                    <>O-Glycan</>
                  </span>
                </span>
              </li>
              <li>
                <span class="super4 hover" data-highlight="Otrack_withnoImage">
                  &#9650;
                  <span class="superx">
                    <>O-Glycan-Site</>
                  </span>
                </span>
              </li>
              <li>
                <span class="super6 hover" data-highlight="track_sequon">
                  &#9646;
                  <span class="superx">
                    <>N-Glycan-Sequon</>
                  </span>
                </span>
              </li>
              <li>
                <span class="super5 hover" data-highlight="track_muarray">
                  &#9670;
                  <span class="superx">
                    <>Mutation</>
                  </span>
                </span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProtvistaSidebar;
