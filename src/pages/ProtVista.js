import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProteinDetail } from "../data/protein";
import ProtvistaNav from "../components/navigation/ProtvistaNav";
import "d3";
import ProtvistaSequence from "protvista-sequence";

window.customElements.define("protvista-sequence", ProtvistaSequence);

// const ProtVistaDisplay = ({data}) => {
//   return (
// <div class="main menu">
//   <nav class="main-nav">
//     <ul class="main-nav__list">
//         <li class="nav-item1 nav-nav">
//           <a class="nav-link" href="#">Navigation</a>
//         </li>
//         <li class="nav-item nav-seq">
//           <a class="nav-link" href="#">Sequence</a>
//         </li>
//         <li class="nav-item nav-track nav-combinetrack" onclick="navglycoclick()">
//           <a class="nav-link" href="#">Glycosylation &nbsp;&nbsp;<i class="fa fa-caret-right" id="arrowanimation" aria-hidden="true" style="font-size:30px;color:black; position:relative; margin-top:6px;"></i></a>
//         </li>
//         <li id='reported_Nglycan' class="nav-item nav-track hidden indentsubnav">
//                 <a href="#"  class="nav-link" data-toggle="tooltip" title="N-Glycans reported at indicated site!">N-Glycan</a>

//         </li>
//         <li id='nonreported_Nglycan' class="nav-item nav-track hidden indentsubnav">
//                 <a href="#"  class="nav-link" data-toggle="tooltip" title="Sites informatically predicted to be glycosylated">N-Glycan-Site</a>

//         </li>
//         <li id='reported_Oglycan' class="nav-item nav-track hidden indentsubnav">
//                 <a href="#"  class="nav-link" data-toggle="tooltip" title="O-Glycans reported at indicated site">O-Glycan</a>

//         </li>
//         <li id='nonreported_Oglycan' class="nav-item nav-track hidden indentsubnav">
//                 <a href="#"  class="nav-link" data-toggle="tooltip" title="Sites informatically predicted to be glycosylated">O-Glycan-Site</a>

//         </li>
//         <li id='reported_sequon' class="nav-item nav-track hidden indentsubnav">
//                 <a href="#"  class="nav-link" data-toggle="tooltip" title="Consensus sequence for N-glycosylation">N-Glycan-Sequon</a>

//         </li>
//         <li class="nav-item nav-track">
//                 <a href="#"  class="nav-link" data-toggle="tooltip" title="The action or process of mutating.">Mutation</a>
//         </li>

//     </ul>
//   </nav>
// <div class="main-content">
//   {/* <protvista-manager attributes="length displaystart displayend highlightstart highlightend variantfilters" id="manager">

//   </protvista-manager> */}
//   <br>
//   <div class="row">
//       <div class="col-md-6 col-sm-6"> </div>
//       <div class="col-md-3 col-sm-3">
//       </div>
//       <div class="col-md-3 col-sm-3">
//         <ol>
//             <li>
//               <span class="super1 hover" data-highlight="Ntrack_withImage">&#9679;
//                   <span class="superx">
//                     <B>N-Glycan</B>
//                   </span>
//               </span>
//             </li>
//             <li>
//               <span class="super2 hover" data-highlight="Ntrack_withnoImage">&#9650;
//                   <span class="superx">
//                     <B>N-Glycan-Site</B>
//                   </span>
//               </span>
//             </li>
//             <li>
//               <span class="super3 hover" data-highlight="Otrack_withImage">&#9679;
//                   <span class="superx">
//                     <B>O-Glycan</B>
//                   </span>
//               </span>
//             </li>
//             <li>
//               <span class="super4 hover" data-highlight="Otrack_withnoImage">&#9650;
//                   <span class="superx">
//                     <B>O-Glycan-Site</B>
//                   </span>
//               </span>
//             </li>
//             <li>
//               <span class="super6 hover" data-highlight="track_sequon">&#9646;
//                   <span class="superx">
//                     <B>N-Glycan-Sequon</B>
//                   </span>
//               </span>
//             </li>
//             <li>
//               <span class="super5 hover" data-highlight="track_muarray">&#9670;
//                   <span class="superx">
//                     <B>Mutation</B>
//                   </span>
//               </span>
//             </li>

//         </ol>

//       </div>
//   </div>
// </div>
// )
// }

const ProtVista = () => {
  let { id, Protvistadisplay } = useParams();

  const [data, setData] = useState({});

  useEffect(() => {
    const getData = getProteinDetail(id, Protvistadisplay);
    getData.then(({ data }) => {
      if (data.code) {
        console.log(data.code);
      } else {
        setData(data);
      }
    });

    getData.catch(({ response }) => {
      alert(JSON.stringify(response));
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1>Protvista</h1>
      <div className="App">
        <ProtvistaNav />
      </div>

      {/* Back to details button */}

      {/* <ProtVistaDisplay data={data} /> */}

      <protvista-sequence
        id="seq1"
        class="nav-track "
        length="728"
        displaystart="1"
        displayend="728"
        sequence="MWVTKLLPALLLQHVLLHLLLLPIAIPYAEGQRKRRNTIHEFKKSAKTTLIKIDPALKIKTKKVNTADQCANRCTRNKGLPFTCKAFVFDKARKQCLWFPFNSMSSGVKKEFGHEFDLYENKDYIRNCIIGKGRSYKGTVSITKSGIKCQPWSSMIPHEHSFLPSSYRGKDLQENYCRNPRGEEGGPWCFTSNPEVRYEVCDIPQCSEVECMTCNGESYRGLMDHTESGKICQRWDHQTPHRHKFLPERYPDKGFDDNYCRNPDGQPRPWCYTLDPHTRWEYCAIKTCADNTMNDTDVPLETTECIQGQGEGYRGTVNTIWNGIPCQRWDSQYPHEHDMTPENFKCKDLRENYCRNPDGSESPWCFTTDPNIRVGYCSQIPNCDMSHGQDCYRGNGKNYMGNLSQTRSGLTCSMWDKNMEDLHRHIFWEPDASKLNENYCRNPDDDAHGPWCYTGNPLIPWDYCPISRCEGDTTPTIVNLDHPVISCAKTKQLRVVNGIPTRTNIGWMVSLRYRNKHICGGSLIKESWVLTARQCFPSRDLKDYEAWLGIHDVHGRGDEKCKQVLNVSQLVYGPEGSDLVLMKLARPAVLDDFVSTIDLPNYGCTIPEKTSCSVYGWGYTGLINYDGLLRVAHLYIMGNEKCSQHHRGKVTLNESEICAGAEKIGSGPCEGDYGGPLVCEQHKMRMVLGVIVPGRGCAIPNRPGIFVRVAYYAKWIHKIILTYKVPQS"
      ></protvista-sequence>
    </div>
  );
};

export default ProtVista;
