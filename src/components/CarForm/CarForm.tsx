import React from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { chooseMake,chooseModel,chooseYear,chooseCondition } from '../../redux/slices/rootSlice';
import { Input } from "../sharedComponents/Input";
import { server_calls } from '../../api';
import { useGetData } from '../../custom-hooks/FetchData';

// add custom hooks and match the models.py in the flask inventory app

interface CarFormProps {
  id?: string;
  data?: {};
}

interface CarState {
  name: string;
  model: string;
  year: number;
  condition: string;
  favorite_toy: string;
}

export const CarForm = (props: CarFormProps) => {
  const dispatch = useDispatch();
  let { carData, getData } = useGetData();
  const store = useStore();
  const { register, handleSubmit } = useForm({});

  const onSubmit = async (data: any, event: any) => {
    console.log(props.id);
    if (props.id!) {
      await server_calls.update(props.id!, data)
      console.log(`Updated: ${data} ${props.id}`);
      window.location.reload();
      event.target.reset();
    }
     else {
        dispatch(chooseMake(data.name))
        dispatch(chooseModel(data.model))
        dispatch(chooseYear(data.year))
        dispatch(chooseCondition(data.condition))
        await server_calls.create(store.getState())
        window.location.reload()
    }
    }
    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="Make">Make</label>
            <Input
              {...register("make")}
              name="make"
              placeholder="Enter car make"
            />
          </div>
          <div>
            <label htmlFor="model"></label>
            <Input
              {...register("model")}
              name="model"
              placeholder="Enter Car model"
            />
          </div>
          <div>
            <label htmlFor="year">Age</label>
            <Input
              {...register("year")}
              name="year"
              placeholder="Enter car year"
            />
          </div>
          <div>
            <label htmlFor="condition">Condition</label>
            <Input
              {...register("condition")}
              name="condition"
              placeholder="Enter the car condition"
            />
          </div>

          <Button type="submit" color="error">
            Submit
          </Button>
        </form>
      </div>
    );
  };
