import Backdrop from '../components/Backdrop/Backdrop';
import UserDetail from '../components/Users/UserDetail';
import Spinner from '../components/Spinner/Spinner';
import AuthContext from '../context/auth-context';
import SearchForm from '../components/Forms/SearchForm';


class UsersPage extends Component {

  state = {
    searching: false,
    search: {},
    users: [],
    patients: [],
    appointments: [],
    results: [],
    isLoading: false,
    selectedUser: null,
    selectedPatient: null,
    selectedAppointment: null,
    selectedResult: null
  };
  isActive = true;

  static contextType = AuthContext;

  constructor(props) {
    super(props);
      this.idElRef = React.createRef();
      this.fieldElRef = React.createRef();
      this.queryElRef = React.createRef();
  }

  componentDidMount() {

  }

  // search functions: by id, all, feild


  modalSearchHandler = () => {
    this.setState({ searching: false });

    const id = this.idElRef.current.value;
    const field = this.fieldElRef.current.value;
    const query = this.queryElRef.current.value;


    if (
      id.trim().length === 0 ||
      field.trim().length === 0 ||
      query.trim().length === 0
    ) {
      return;
    }

    search() {
      console.log("'search function' context object... " + JSON.stringify(this.context));
      const userId = this.context.userId;

      const search = { id, field, query };
      console.log("running search... search object:  ", JSON.stringify(search));

      this.setState({ isLoading: true, search: search });
      const requestBody = {
        query: `
            query users($userId: ID!) {
              users(userId: $userId) {
                _id
                email
                password
                name
                role
              }
            }
          `,
          variables: {
            userId: userId
          }
      };

      fetch('http://localhost:10000/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.context.token
        }
      })
        .then(res => {
          if (res.status !== 200 && res.status !== 201) {
            throw new Error('Failed!');
          }
          return res.json();
        })
        .then(resData => {
          const users = resData.data.users;
          console.log(users);

          if (this.isActive) {
            this.setState({ users: users, isLoading: false });
          }
        })
        .catch(err => {
          console.log(err);
          if (this.isActive) {
            this.setState({ isLoading: false });
          }
        });
    }
  };


  modalCancelHandler = () => {
    this.setState({ searching: false, selectedUser: null });
  };


  showDetailHandler = resultId => {

    // pass result id from resultList component

    this.setState(prevState => {
      const selectedResult = prevState.results.find(e => e._id === resultId);
      // this.context.selectedUser = selectedUser;
      console.log("here:  ", selectedResult);
      return { selectedResult: selectedResult };
    });
  };


  componentWillUnmount() {
    this.isActive = false;
  }

  render() {
    return (
      <React.Fragment>
        {this.state.searching === false && (
          <SearchForm
          canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalSearchHandler}
            confirmText="Confirm"
            search={this.state.search}
          />
        )}
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <SearchList
            results={this.state.results}
            authUserId={this.context.userId}
            onViewDetail={this.showDetailHandler}
          />
        )}
      </React.Fragment>
    );
  }
}

export default SearchPage;
