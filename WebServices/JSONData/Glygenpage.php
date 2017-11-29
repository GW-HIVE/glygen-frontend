g<?php

/*** this is the client ***/


if (isset($_GET["action"]) && isset($_GET["id"]) && $_GET["action"] == "get_user") // if the get parameter action is get_user and if the id is set, call the api to get the user information
{
  $user_info = file_get_contents('http://glycomics.ccrc.uga.edu/ggtest/service/restfulapi.php?action=get_user&id=' . $_GET["id"]);
  $user_info = json_decode($user_info, true);

  // THAT IS VERY QUICK AND DIRTY !!!!!
  ?>
    <table>
      <tr>
        <td>Mass: </td><td> <?php echo $user_info["mass"] ?></td>
      </tr>
      <tr>
        <td>Glycan Type: </td><td> <?php echo $user_info["glycan_type"] ?></td>
      </tr>
      <tr>
        <td>Organism: </td><td> <?php echo $user_info["organism"] ?></td>
      </tr>
    </table>
    <a href="http://glycomics.ccrc.uga.edu/ggtest/gui/?action=get_userlist" alt="user list">Return to the user list</a>
  <?php
}
else // else take the user list
{
  $user_list = file_get_contents('http://glycomics.ccrc.uga.edu/ggtest/service/api.php?action=get_user_list');
  $user_list = json_decode($user_list, true);
  // THAT IS VERY QUICK AND DIRTY !!!!!
  ?>
    <ul>
    <?php foreach ($user_list as $user): ?>
      <li>
        <a href=<?php echo "http://glycomics.ccrc.uga.edu/ggtest/gui/glygenpage.php?action=get_user&id=" . $user["id"]  ?> alt=<?php echo "user_" . $user_["id"] ?>><?php echo $user["query_type"] ?></a>
    </li>
    <?php endforeach; ?>
    </ul>
  <?php
}

?>
