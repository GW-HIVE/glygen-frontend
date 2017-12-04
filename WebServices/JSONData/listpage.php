<?php

if (isset($_GET["action"]) && isset($_GET["id"]) && $_GET["action"] == "get_user") // if the get parameter action is get_user and if the id is set, call the api to get the user information
{
  $user_infoo = file_get_contents('http://glycomics.ccrc.uga.edu/ggtest/service/imagewebservice.php?action=get_user&id=' . $_GET["id"]);
  $user_infoo = json_decode($user_infoo, true);
  $user_info = file_get_contents('http://glycomics.ccrc.uga.edu/ggtest/service/Restfulapi.php?action=get_user&id=' . $_GET["id"]);
  $user_info = json_decode($user_info, true);


  ?>
<table style="width:50%">
<tr>
  <th>GlyGenID</th>
  <th>Cartoon</th>
  <th>Type</th>
  <th>Mass</th>
  <th>organism</th>
  <th>Motif_list</th>

</tr>
      <tr>
        <td><?php echo $user_info["GlyGenID"] ?></td>
        <td> <img src= "http://glycomics.ccrc.uga.edu/ggtest/service/Glygenimages/GOG5.jpg"> </td>
        <td><?php echo $user_info["glycan_type"] ?></td>
        <td><?php echo $user_info["mass"] ?> </td>
        <td><?php echo $user_info["organism"] ?> </td>
        <td><?php echo $user_info["Motif_list"] ?> </td>
      </tr>



</table>
    <!--a href="http://glycomics.ccrc.uga.edu/ggtest/gui/?action=get_userlist" alt="user list">Return to the user list</a-->
  <?php
}
else // else take the user list
{
  $user_list = file_get_contents('http://glycomics.ccrc.uga.edu/ggtest/service/imagewebservice.php?action=get_user_list');
  $user_list = json_decode($user_list, true);

  ?>
    <ul>
    <?php foreach ($user_list as $user): ?>
      <li>
        <a href=<?php echo "http://glycomics.ccrc.uga.edu/ggtest/gui/listpage.php?action=get_user&id=" . $user["id"]  ?> alt=<?php echo "user_" . $user_["id"] ?>><?php echo $user["img"] ?></a>
    </li>
    <?php endforeach; ?>
    </ul>
  <?php
}

?>
