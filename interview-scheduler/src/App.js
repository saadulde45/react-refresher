import React, { Component } from 'react';
import './App.scss';
import { connect } from 'react-redux';
import CandidateTable from './candidate-table';
import moment from 'moment';

class App extends Component {

	constructor(props) {
		super(props);

		const columnFormatter = (cell, rowData, rowIdx, extraFormatData) => {

			if (extraFormatData.columnType === "testDetails") {
				if (rowData.testDetails.score < 3) {
					return "Rejected";
				} else {
					return "Selected";
				}
			}

			if (extraFormatData.columnType === "l1Details") {
				switch (extraFormatData.columnField) {
					case "score":
						if (rowData.testDetails.score >= 3) {
							if (rowData.l1Details.score !== null) {
								return rowData.l1Details.score;
							} else {
								return (
									<button>Schedule L1</button>
								);
							}
						} else {
							return "NA";
						}
					case "status":
						if (rowData.testDetails.score >= 3 && rowData.l1Details.score !== null) {

							if (rowData.l1Details.score >= 3) {
								return (
									<span>
										Selected {timer(rowData.l1Details.startTime, rowData.l1Details.endTime)} mins
                            </span>
								);
							} else {
								return "Rejected";
							}
						} else {
							return "NA";
						}
					default: break;
				}

			}

			if (extraFormatData.columnType === "gkDetails") {
				switch (extraFormatData.columnField) {
					case "score":
						if (rowData.testDetails.score >= 3 && rowData.l1Details.score >= 3) {
							if (rowData.gkDetails.score !== null) {
								return rowData.gkDetails.score;
							} else {
								return (
									<button>Schedule L1</button>
								);
							}
						} else {
							return "NA";
						}
					case "status":
						if (rowData.testDetails.score >= 3 && rowData.l1Details.score >= 3) {
							if (rowData.gkDetails.score !== null) {
								if (rowData.gkDetails.score >= 3) {
									return (
										<span>
											Selected {timer(rowData.gkDetails.startTime, rowData.gkDetails.endTime)} mins
                                  </span>
									);
								} else {
									return "Rejected";
								}
							} else {
								return "NA";
							}
						} else {
							return "NA";
						}
					default: break;
				}

			}
		};

		function updateCellBackground(cellValue) {
			if (cellValue === 0) {
				return '#808080'
			} else if (cellValue === null || cellValue < 3) {
				return '#FA8072'
			} else if (cellValue >= 3 && cellValue <= 5) {
				return '#ADFF2F'
			} else {
				return '#FF7F50'
			}
		}

		function timer(startTime, endTime) {
			var start = new moment(startTime);
			var end = new moment();

			if (endTime !== null && endTime.length !== 0) {
				end = new moment(endTime);
			}
			var duration = moment.duration(end.diff(start));
			return duration.asMinutes();
		}

		const scoreValidation = (newValue, row, column) => {
			if (isNaN(newValue) || newValue < 1 || newValue > 6) {
				return {
					valid: false,
					message: 'The value should be number and in the range of 1 - 5'
				};
			} else {
				return true;
			}
		}

		const cellStyles = (content, rowData, rowIndex, colIndex) => {
			let score = 0;
			switch (colIndex) {

				case 2:
				case 3:
					return {
						backgroundColor: updateCellBackground(rowData.testDetails.score)
					};

				case 4:
				case 5:
					if (rowData.testDetails.score < 3) {
						score = 0;
					} else {
						score = rowData.l1Details.score;
					}
					return {
						backgroundColor: updateCellBackground(score)
					};

				case 6:
				case 7:
					if (rowData.testDetails.score < 3 || rowData.l1Details.score < 3) {
						score = 0;
					} else {
						score = rowData.gkDetails.score;
					}
					return {
						backgroundColor: updateCellBackground(score)
					};

				default: break;
			}
		}

		this.handleTableChange = this.handleTableChange.bind(this);

		this.columns = [{
			dataField: 'name',
			text: 'Name',
			editable: false
		}, {
			dataField: 'experience',
			text: 'Experience',
			editable: false
		}, {
			dataField: 'testDetails.score',
			text: 'Test Score',
			style: cellStyles,
			validator: scoreValidation,
			editCellClasses: (cell, row, rowIndex, colIndex) => {
				return (cell < 1 || cell > 5) ? 'has-error' : 'has-success';
			}
		}, {
			dataField: 'testDetails.startTime',
			text: 'Test Status',
			style: cellStyles,
			editable: (content, row, rowIndex, columnIndex) => {
				return row.testDetails.score >= 3;
			},
			formatter: columnFormatter,
			formatExtraData: {
				"columnType": "testDetails",
				"columnField": "status"
			}
		}, {
			dataField: 'l1Details.score',
			text: 'L1 Score',
			style: cellStyles,
			validator: scoreValidation,
			editable: (content, rowData, rowIndex, columnIndex) => {
				return rowData.testDetails.score >= 3;
			},
			formatter: columnFormatter,
			formatExtraData: {
				"columnType": "l1Details",
				"columnField": "score"
			}
		}, {
			dataField: 'l1Details.startTime',
			text: 'L1 Status',
			style: cellStyles,
			editable: (content, rowData, rowIndex, columnIndex) => {
				return rowData.l1Details.score !== "NA" && rowData.testDetails.score >= 3
					&& rowData.l1Details.score >= 3;
			},
			formatter: columnFormatter,
			formatExtraData: {
				"columnType": "l1Details",
				"columnField": "status"
			}
		}, {
			dataField: 'gkDetails.score',
			text: 'GK Score',
			style: cellStyles,
			validator: scoreValidation,
			editable: (content, rowData, rowIndex, columnIndex) => {
				return rowData.l1Details.score !== "NA" && rowData.testDetails.score >= 3
					&& rowData.l1Details.score >= 3;
			},
			formatter: columnFormatter,
			formatExtraData: {
				"columnType": "gkDetails",
				"columnField": "score"
			}
		}, {
			dataField: 'gkDetails.startTime',
			text: 'GK Status',
			style: cellStyles,
			editable: (content, rowData, rowIndex, columnIndex) => {
				return rowData.gkDetails.score !== "NA" && rowData.testDetails.score >= 3
					&& rowData.l1Details.score >= 3 && rowData.gkDetails.score >= 3;
			},
			formatter: columnFormatter,
			formatExtraData: {
				"columnType": "gkDetails",
				"columnField": "status"
			}
		}];

		this.state = {
			data: [],
			loading: true
		};

		setTimeout(() => {
			this.setState({
				data: this.props.users,
				loading: false
			});
		}, 2000);
	}

	handleTableChange(eventType, { cellEdit, data }) {

		console.log('change', eventType, cellEdit, data);

		if (eventType === 'cellEdit') {

			var dataField = cellEdit.dataField.split('.');
			var oldData = data.filter(row => {
				return row.emailId === cellEdit.rowId
			})[0][dataField[0]][dataField[1]];

			console.log(oldData);

			if (cellEdit.newValue < 3) {
				return (false);
			}
		}
	}

	render() {
		return (
			<div>
				<CandidateTable
					columns={this.columns}
					data={this.state.data}
					keyField='emailId'
					loading={this.state.loading}
					onTableChange={this.handleTableChange}
				/>
			</div>
		);
	}
}

const mapStateToProps = function (store) {
	return { users: store.users }
}

export default connect(mapStateToProps)(App);
