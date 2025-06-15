import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const AddressCard = ({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) => {
  // const [trigger, setTigger] = useState(false);

  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer border-red-700 ${
        selectedId?._id === addressInfo?._id
          ? "border-gray-600 border-[4px]"
          : "border-black"
      }`}
    >
      <CardContent
        className={`${
          selectedId === addressInfo?._id ? "border-black" : ""
        } grid gap-4 p-4`}
      >
        <Label>
          Address:{" "}
          <span className="text-slate-800">{addressInfo?.address}.</span>
        </Label>
        <Label>
          <span className="text-slate-800">City: {addressInfo?.city}</span>
        </Label>
        <Label>
          <span className="text-slate-800">Phone: {addressInfo?.phone}</span>
        </Label>
        <Label>
          <span className="text-slate-800">
            Pincode: {addressInfo?.pincode}
          </span>
        </Label>
        <Label>
          <span className="text-slate-800">Notes: {addressInfo?.notes}</span>
        </Label>
      </CardContent>

      <CardFooter className="flex justify-end p-2">
        <Button
          onClick={() => handleEditAddress(addressInfo)}
          variant="outline"
          className="m-1 hover:bg-green-600"
        >
          Edit
        </Button>
        <Button
          onClick={() => handleDeleteAddress(addressInfo)}
          variant="outline"
          className="m-1 hover:bg-red-600"
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;
