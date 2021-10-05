#!/bin/bash
echo "First arg: $1"
echo "Second arg: $2"

# echo "Do you want to add fields in user model ************"
# echo "  1)Yes"
# echo "  2)No"

# read n
# case $n in
#   1)    echo -n "Please add your first field "
#         read answer1
#         echo "Select the type you want to assign to it ? "
#         echo "String"
#         echo "Email"
#         echo "Anything"
#         read answer2
#         echo "You made choices $answer1 and $answer2"
#   ;;
#   2) echo "Ok, now you can create your own structure";;
#   *) echo "invalid option";;
# esac

PS3=$'\n\nSelect the animals you like: '
options=$(grep '1' items|grep -v '^#' |awk '{ print $1 }')

# Array for storing the user's choices
choices=()

select choice in $options Finished
do
  # Stop choosing on this option
  [[ $choice = Finished ]] && break
  # Append the choice to the array
  choices+=( "$choice" )
  echo "$choice, got it. Any others?"
done

# Write out each choice
printf "You selected the following: "
for choice in "${choices[@]}"
do
  printf "%s " "$choice"
done
printf '\n'

exit 0