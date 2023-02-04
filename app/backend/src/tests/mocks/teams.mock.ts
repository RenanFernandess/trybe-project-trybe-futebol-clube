const teamsMock = [
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
]

export default teamsMock;

export const teamMock = {
  dataValues: {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  get id() { return this.dataValues.id },
  get teamName() { return this.dataValues.teamName },
};
