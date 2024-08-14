import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useGlobal } from "../../utilities/globalContext";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Cashier = () => {
  const { cashier, cashiers, setCashier } = useGlobal();
  return (
    <div>
      <nav>
        <Button>
          <Link to="statistics">Statistics</Link>
        </Button>
      </nav>
      <div className="flex justify-center items-center flex-col p-5">
        <FormControl className="">
          <FormLabel>Select Cashier</FormLabel>
          {cashier && cashiers.length > 0 && (
            <RadioGroup
              aria-labelledby="radio-buttons-group-label"
              defaultValue={cashier?.id || cashiers[0].id}
              name="radio-buttons-group"
              data-testid="radio-group"
            >
              {cashiers.map((cashier) => (
                <FormControlLabel
                  key={cashier.id}
                  value={cashier.id}
                  control={<Radio />}
                  label={cashier.name}
                  onClick={() => {
                    setCashier({
                      name: cashier.name,
                      id: cashier.id,
                    });
                  }}
                />
              ))}
            </RadioGroup>
          )}
        </FormControl>
      </div>
    </div>
  );
};

export default React.memo(Cashier);
