This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

import MonsterBall from '@material-ui/icons/Restaurant';
import Versus from '@material-ui/icons/SmokeFree';
="""heavy"":"""&N1&"""}"

create table pokemons (id int auto_increment, name varchar(10), number varchar(10), user_id int, effort_h int, effort_a int, effort_b int, effort_c int, effort_d int, effort_s int, move_1 varchar(10), move_2 varchar(10), move_3 varchar(10), move_4 varchar(10), nature varchar(10), ability varchar(10), memo varchar(255), created_at datetime, updated_at datetime, deleted_at datetime, index(id));

create table parties (id int auto_increment, name varchar(10), user_id int, pokemon_id_1 int, pokemon_id_2 int, pokemon_id_3 int, pokemon_id_4 int, pokemon_id_5 int, pokemon_id_6 int, memo varchar(255), created_at datetime, updated_at datetime, deleted_at datetime, index(id));

create table logs (id int auto_increment, name varchar(10), user_id int, party_id int, pokemon_num_1 varchar(10), pokemon_num_2 varchar(10), pokemon_num_3 varchar(10), pokemon_num_4 varchar(10), pokemon_num_5 varchar(10), pokemon_num_6 varchar(10), my_select_1 boolean, my_select_2 boolean, my_select_3 boolean, my_select_4 boolean, my_select_5 boolean, my_select_6 boolean, oppo_select_1 boolean, oppo_select_2 boolean, oppo_select_3 boolean, oppo_select_4 boolean, oppo_select_5 boolean, oppo_select_6 boolean, result boolean, my_first int, oppo_first varchar(10), memo varchar(255), created_at datetime, updated_at datetime, deleted_at datetime, index(id));

{"pokemon":
	{
	"name": "name3",
	"number": "num",
	"user_id": 1,
	"effort_h": 4,
	"effort_a": 252,
	"effort_b": 0,
	"effort_c": 0,
	"effort_d": 0,
	"effort_s": 252,
	"move_1": "10万",
	"move_2": "waza",
	"move_3": "move",
	"move_4": "mive",
	"nature": "nature",
	"ability": "ability",
	"memo": "これはメモだよ～"
	}
}

__class__ __delattr__ __dict__ __dir__ __doc__ __eq__ __format__ __ge__ __getattribute__ __gt__ __hash__ __init__ __init_subclass__ __le__ __lt__ __mapper__ __module__ __ne__ __new__ __reduce__ __reduce_ex__ __repr__ __setattr__ __sizeof__ __str__ __subclasshook__ __table__ __tablename__ __weakref__ _decl_class_registry _sa_class_manager _sa_instance_state ability created_at deleted_at effort_a effort_b effort_c effort_d effort_h effort_s id logs memo metadata move_1 move_2 move_3 move_4 name nature number parties updated_at user user_id