import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('members').del();
  await knex('members').insert([
    {
      id: 1,
      company_id: 1,
      team_id: 1,
      username: "peter123",
      password: bcrypt.hashSync("peter123", 6),
      member_name: "Peter",
      member_title: "Boss",
      member_email: "",
      member_phone: "",
      member_address: "",
      isTeamLeadOrNot: false
    },
    {
      id: 2,
      company_id: 1,
      team_id: 2,
      username: "jack123",
      password: bcrypt.hashSync("jack123", 6),
      member_name: "Jack",
      member_title: "",
      member_email: "Jack@gmail.com",
      member_phone: "5198584832",
      member_address: "111 Blvd",
      isTeamLeadOrNot: false
    },
    {
      id: 3,
      company_id: 1,
      team_id: 4,
      username: "john123",
      password: "john123",
      member_name: "John",
      member_title: "",
      member_email: "John@gmail.com",
      member_phone: "4165194848",
      member_address: "222 Blvd",
      isTeamLeadOrNot: false
    },
    {
      id: 4,
      company_id: 2,
      team_id: 5,
      username: "justin123",
      password: bcrypt.hashSync("justin123", 6),
      member_name: "Justin",
      member_title: "Boss",
      member_email: "",
      member_phone: "",
      member_address: "",
      isTeamLeadOrNot: false
    },
    {
      id: 5,
      company_id: 2,
      team_id: 6,
      username: "greg123",
      password: bcrypt.hashSync("greg123", 6),
      member_name: "Greg",
      member_title: "",
      member_email: "Greg@gmail.com",
      member_phone: "100073185",
      member_address: "333 Blvd",
      isTeamLeadOrNot: false
    },
    {
      id: 6,
      company_id: 2,
      team_id: 8,
      username: "tom123",
      password: "tom123",
      member_name: "Tom",
      member_title: "",
      member_email: "Tom@gmail.com",
      member_phone: "4195830927",
      member_address: "444 Blvd",
      isTeamLeadOrNot: false
    },
  ]);
};