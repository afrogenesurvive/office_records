import React, { Component } from 'react';

import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import GroupList from '../components/Groups/GroupList/GroupList';
import Spinner from '../components/Spinner/Spinner';
import AuthContext from '../context/auth-context';
import './Groups.css';

class GroupssPage extends Component {
  state = {
    creating: false,
    groups: [],
    isLoading: false,
    selectedGroup: null
  };
  isActive = true;

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.typeElRef = React.createRef();
    this.subtypeKeyElRef = React.createRef();
    this.subtypeValueElRef = React.createRef();
    this.nameElRef = React.createRef();
    this.descriptionElRef = React.createRef();
  }

  componentDidMount() {
    this.fetchGroups();
  }


  createAction(creatorId,type,body) {

    console.log("'create actions function' context object... " + JSON.stringify(this.context));
    console.log("args.creatorId..." + creatorId, "action type..." + type, "action body..." + body);
    const userId = creatorId;
    const token = this.context.token;

    const requestBody = {
      query: `
          mutation createAction($userId: ID!, $type: String!, $body: String!) {
            createAction(userId: $userId, actionInput: {type: $type, body: $body}) {
              _id
              creator
              {_id,username}
              body
            }
          }
        `,
        variables: {
          userId: userId,
          type: type,
          body: body
        }
    };

    fetch('http://localhost:5000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {

        console.log("response data... " + JSON.stringify(resData));
        this.context.action1 = null;

          })
      .catch(err => {
        console.log(err);
      });

  }

  startCreateGroupHandler = () => {
    this.setState({ creating: true });
  };

  modalConfirmHandler = () => {
    this.setState({ creating: false });
    const type = this.type.current.value;
    const key = this.subtypeKey.current.value;
    const value = this.subtypeValue.current.value;
    const name = this.name.current.value;
    const description = this.description.current.value;

    if (
      type.trim().length === 0 ||
      subtypeKey.trim().length === 0 ||
      subtypeValue.trim().length === 0 ||
      name.trim().length === 0 ||
      description.trim().length === 0 ||
    ) {
      return;
    }

    const group = { type, key, value, name, description };
    console.log("creating group... " + JSON.stringify(group));

    const requestBody = {
      query: `
          mutation CreateGroup($type: String!, $groupSubtypeInput:{$key:String!, $value:String!}, $name: String!, $description: String!) {
            createGroup(groupInput: {type: $type, groupSubtypeInput: {key: $key, value: $value}, name: $name, description: $description}) {
              _id
              type
              creator{
                username
              }
              subtype{
                key
                value
              }
              name
              description
            }
          }
        `,
        variables: {
          type: type,
          name: name,
          description: description,
          groupSubtypeInput: groupSubtypeInput,
          key: key,
          value: value
        }
    };

    const token = this.context.token;

    fetch('http://localhost:5000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        console.log("response data... " + JSON.stringify(resData));
        this.setState(prevState => {
          const updatedGroups = [...prevState.groups];
          updatedGroups.push({
            _id: resData.data.createUser._id,
            name: resData.data.createUser.name,
            type: resData.data.createUser.type,
            subtype: resData.data.createUser.subtype,
            description: resData.data.createUser.description
          });

          // createAction(this.context.id,"mutation",requestBody);

          return { groups: updatedGroups };
        });
        this.context.action1 = JSON.stringify(requestBody);
        console.log("this context object..." + JSON.stringify(this.context));
        console.log("this context action1..." + this.context.action1);

        this.createAction(this.context.id,"mutation",this.context.action1);
      })
      .catch(err => {
        console.log(err);
      });
  };

  modalCancelHandler = () => {
    this.setState({ creating: false, selectedUser: null });
  };

  fetchUsers() {
    console.log("'fetch groups function' context object... " + JSON.stringify(this.context));
    const userId = this.context.userId;

    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          query groups($userId: ID!) {
            groups(userId: $userId) {
              _id
              name
              creator{
                username
              }
              type
              subtype{
                key
                value
              }
              description
              tags
              users{
                username
              }
            }
          }
        `,
        variables: {
          userId: userId
        }
    };

    fetch('http://localhost:5000/graphql', {
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
        const groups = resData.data.groups;
        console.log(groups);

        this.context.action1 = JSON.stringify(requestBody);
        console.log("this context object..." + JSON.stringify(this.context));
        console.log("this context action1..." + this.context.action1);
        this.createAction(userId,"query",this.context.action1);

        if (this.isActive) {
          this.setState({ groups: groups, isLoading: false });
        }
      })
      .catch(err => {
        console.log(err);
        if (this.isActive) {
          this.setState({ isLoading: false });
        }
      });
  }


  showDetailHandler = userId => {
    this.setState(prevState => {
      const selectedUser = prevState.users.find(e => e._id === userId);
      return { selectedUser: selectedUser };
    });
  };


  componentWillUnmount() {
    this.isActive = false;
  }

  render() {
    return (
      <React.Fragment>
        {(this.state.creating || this.state.selectedGroup) && <Backdrop />}
        {this.state.creating && (
          <Modal
            title="Create Group"
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmHandler}
            confirmText="Confirm"
          >
            <form>
              <div className="form-control">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" ref={this.nameElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="type">Type</label>
                <input type="text" id="type" ref={this.typeElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="subtypeKey">SubType: Key</label>
                <input type="text" id="subtypeKey" ref={this.subtypeKeyElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="subtypeValue">SubType: Value</label>
                <input type="text" id="subtypeValue" ref={this.subtypeValueElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="description">Description</label>
                <input type="text" id="description" ref={this.descriptionElRef} />
              </div>

            </form>
          </Modal>
        )}
        {this.state.selectedGroup && (
          <Modal
            username={this.state.selectedGroup.name}
            canCancel
            onCancel={this.modalCancelHandler}
          >
            <h1>{this.state.selectedGroup.name}</h1>
            <h2>
              {this.state.selectedGroup.type}
            </h2>
            <p>{this.state.selectedGroup.description}</p>
          </Modal>
        )}
        {this.context.token && (
          <div className="groups-control">
            <p>Start a Group!</p>
            <button className="btn" onClick={this.startCreateGroupHandler}>
              Create
            </button>
          </div>
        )}
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <GroupList
            groups={this.state.groups}
            authUserId={this.context.userId}
            onViewDetail={this.showDetailHandler}
          />
        )}
      </React.Fragment>
    );
  }
}

export default GroupsPage;
