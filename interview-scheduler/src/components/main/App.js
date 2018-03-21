import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getCandidates from "../../actions/actions";
import CandidateTable from '../candidate-table/candidate-table';
import moment from 'moment';

const mapStateToProps = function (store) {
	console.log("stat store", store);
	return { candidates: store.candidatesRed.candidates }
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ getCandidates: getCandidates }, dispatch);
}

class App extends Component {

	constructor(props) {
		super(props);

		console.log("app props", props);

		const columnFormatter = (cell, rowData, rowIdx, extraFormatData) => {

			if (extraFormatData.columnType === "testDetails") {
				if (rowData.testDetails.score < 3) {
					return "Rejected";
				} else {
					return "Selected";
				}
			}

			if (extraFormatData.columnType === "l1Details" || extraFormatData.columnType === "gkDetails") {
				return getDetails(rowData, extraFormatData);
			}
		};
		function getDetails(rowData, extraFormatData) {
			switch (extraFormatData.columnField) {
				case "score":
					if (rowData.testDetails.score >= 3) {
						if (rowData.l1Details.score !== null) {
							if(extraFormatData.columnType === "gkDetails") {
								if(rowData.l1Details.score >= 3) {
									return rowData.gkDetails.score;
								} else {
									return scheduleL1();
								}
							} else {
								return rowData.l1Details.score;
							}							
						} else {
							return scheduleL1();
						}
					} else {
						return "NA";
					}
				case "status":

					if (rowData.testDetails.score >= 3 && rowData.l1Details.score !== null) {
							if (rowData.l1Details.score >= 3) {
									if(extraFormatData.columnType === "l1Details") {
										return timer(rowData.l1Details.startTime, rowData.l1Details.endTime);
									}
									if(extraFormatData.columnType === "gkDetails" && rowData.gkDetails.score !== null) {
										if (rowData.gkDetails.score >= 3) {
											return timer(rowData.gkDetails.startTime, rowData.gkDetails.endTime);
										} else {
											return "Rejected";
										}
									} else {
										return "NA";
									}
							} else {
								return "Rejected";
							}
						} else {
							return "NA";
						}
				default: break;
			}

		}

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
			return <span>Selected {duration.asMinutes()} mins</span>			
		}
		function scheduleL1() {
			return	<button>Schedule L1</button>;
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
			loading: true
		};
	}



	handleTableChange(eventType, { cellEdit, data }) {

		if (eventType === 'cellEdit') {

			var dataField = cellEdit.dataField.split('.');
			var newData = data.map(row => {
				if (row.emailId === cellEdit.rowId) {
					row[dataField[0]][dataField[1]] = cellEdit.newValue;
				}
				return row;
			});

			this.setState({
				data: newData
			});
		}
	}

	componentDidMount() {
		this.props.getCandidates();
	}
	
	componentWillReceiveProps(nextProps) {
		this.setState({
			data: nextProps.candidates,
			loading: false
		});
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
